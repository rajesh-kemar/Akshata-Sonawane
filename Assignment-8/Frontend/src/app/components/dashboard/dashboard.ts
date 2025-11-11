import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { TripService } from '../../services/trips-service';
import { DriverService } from '../../services/driver-service';
import { VehicleService } from '../../services/vehicle-service';
import { UserService } from '../../services/user-service';
import { Trip, TripStatus } from '../../Models/TripModel';
import { DriverSummary } from '../../Models/DriverSummary';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  // Roles & identity
  isDriver = false;
  driverName = '';

  // Counts & stats
  activeTripsCount = 0;
  completedTripsCount = 0;
  totalHours = 0;
  availableDriversCount = 0;
  availableVehiclesCount = 0;

  // Trips list
  trips: Trip[] = [];

  // Driver summary
  driverSummary: DriverSummary | null = null;

  errorMessage = '';

  constructor(
    private userService: UserService,
    private tripService: TripService,
    private driverService: DriverService,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role = this.userService.getRole();
    this.isDriver = role === 'Driver';
    this.driverName = this.userService.getDriverName() || '';

    if (this.isDriver && this.driverName) {
      // Load driver trips
      this.loadDriverDashboard();

      // Fetch summary once, cached in service
      this.driverService.getMySummary().subscribe({
        next: (summary: DriverSummary) => {
          this.driverSummary = summary;
          this.totalHours = summary.totalHours;
        },
        error: (err) => console.error('Error loading driver summary', err)
      });
    } else if (!this.isDriver) {
      this.loadDispatcherDashboard();
    } else {
      this.errorMessage = 'Driver information not found. Please log in again.';
    }
  }

  /** ---------------- DRIVER DASHBOARD ---------------- */
  private loadDriverDashboard(): void {
    this.tripService.getTrips().subscribe({
      next: (trips: Trip[]) => {
        this.trips = (trips || []).filter(
          t => t.assignedDriver?.driverName === this.driverName
        );

        this.activeTripsCount = this.trips.filter(t => t.status === TripStatus.InUse).length;
        this.completedTripsCount = this.trips.filter(t => t.status === TripStatus.Completed).length;
      },
      error: (err) => {
        console.error('Error loading driver trips', err);
        this.errorMessage = 'Failed to load trips';
      }
    });
  }

  /** ---------------- DISPATCHER DASHBOARD ---------------- */
  private loadDispatcherDashboard(): void {
    forkJoin({
      trips: this.tripService.getTrips(),
      drivers: this.driverService.getDrivers(),
      vehicles: this.vehicleService.getVehicles()
    }).subscribe({
      next: ({ trips, drivers, vehicles }) => {
        this.trips = trips || [];

        this.activeTripsCount = this.trips.filter(t => t.status === TripStatus.InUse).length;
        this.completedTripsCount = this.trips.filter(t => t.status === TripStatus.Completed).length;

        this.availableDriversCount = (drivers || []).filter(d => d.status === 'Available').length;
        this.availableVehiclesCount = (vehicles || []).filter(v => v.status === 'Available').length;
      },
      error: (err) => {
        console.error('Error loading dispatcher dashboard', err);
        this.errorMessage = 'Failed to load dashboard';
      }
    });
  }

  /** ---------------- MARK TRIP COMPLETE ---------------- */
  completeTrip(trip: Trip): void {
    if (trip.status === TripStatus.Completed) {
      alert('This trip is already completed.');
      return;
    }

    this.tripService.markTripCompleted(trip.tripID).subscribe({
      next: () => {
        alert('Trip marked as completed!');

        // Refresh counts & trips
        if (this.isDriver) {
          this.loadDriverDashboard();
          // driver summary cached, no need to call API again
        } else {
          this.loadDispatcherDashboard();
        }
      },
      error: (err) => {
        console.error('Error completing trip', err);
        this.errorMessage = 'Failed to mark trip as completed';
      }
    });
  }

  /** ---------------- NAVIGATION ---------------- */
  navigateToTrips(status: 'active' | 'completed'): void {
    const queryParams: any = { status };
    if (this.isDriver) queryParams.driverName = this.driverName;

    this.router.navigate(['/trip'], { queryParams });
  }

  navigateTo(page: 'driver' | 'vehicle' | 'trip' | 'trip-summary'): void {
    if (!this.isDriver || page === 'trip-summary') {
      this.router.navigate([`/${page}`]);
    }
  }

  editTrip(trip: Trip): void {
    if (trip.status === TripStatus.Completed) {
      alert('Completed trips cannot be edited.');
      return;
    }

    this.router.navigate(['/trip/edit', trip.tripID]);
  }

  /** ---------------- NAVIGATE TO TRIP SUMMARY PAGE ---------------- */
  navigateToTripSummary(): void {
    this.router.navigate(['/trip-summary']);
  }
}
