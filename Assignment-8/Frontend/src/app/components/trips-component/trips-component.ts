import { Component, OnInit } from '@angular/core';
import { Trip, TripStatus } from '../../Models/TripModel';
import { TripService } from '../../services/trips-service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-trips-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trips-component.html',
  styleUrls: ['./trips-component.css'],
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];
  newTrip: Partial<Trip> = {};
  editingTrip: Trip | undefined;
  showAddForm: boolean = false;
  tripStatusEnum = TripStatus;
  showLongTripsOnly: boolean = false;

  // Role & driver info
  isDriver: boolean = false;
  driverName?: string;

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get role and driver info from UserService
    const role = this.userService.getRole();
    this.isDriver = role === 'Driver';
    this.driverName = this.isDriver ? this.userService.getDriverName() : undefined;

    // Load trips with query params (status + driverName)
    this.route.queryParams.subscribe(params => {
      const status = params['status'] || null;
      const driverParam = params['driverName'] || null;

      if (driverParam) {
        this.driverName = driverParam;
      }

      this.loadTrips(status);
    });
  }

  /** Load all trips and filter based on role + query params */
  loadTrips(status?: string | null): void {
    this.tripService.getTrips().subscribe({
      next: (data) => {
        this.trips = data || [];

        // Drivers only see their own trips
        if (this.isDriver && this.driverName) {
          this.trips = this.trips.filter(
            t =>
              t.assignedDriver?.driverName?.toLowerCase() ===
              this.driverName!.toLowerCase()
          );
        }

        // Filter by trip status
        if (status === 'active') {
          this.trips = this.trips.filter(t => t.status === TripStatus.InUse);
        } else if (status === 'completed') {
          this.trips = this.trips.filter(t => t.status === TripStatus.Completed);
        }
      },
      error: (err) => console.error('Error loading trips:', err)
    });
  }

  /** Toggle add form */
  toggleAddForm(): void {
    if (this.isDriver) {
      alert('Drivers cannot add trips!');
      return;
    }
    this.showAddForm = !this.showAddForm;
    this.newTrip = {};
    this.editingTrip = undefined;
  }

  /** Format trip before sending to API */
  private formatTripPayload(trip: Partial<Trip>): Trip {
    return {
      tripID: trip.tripID || 0,
      source: trip.source || '',
      destination: trip.destination || '',
      startTime: trip.startTime
        ? new Date(trip.startTime).toISOString()
        : new Date().toISOString(),
      endTime: trip.endTime
        ? new Date(trip.endTime).toISOString()
        : null,
      status: trip.status || TripStatus.InUse,
      assignedDriverId: trip.assignedDriverId!,
      assignedVehicleId: trip.assignedVehicleId!
    };
  }

  /** Add a new trip */
  addTrip(form: NgForm): void {
    if (this.isDriver) {
      alert('Drivers cannot add trips!');
      return;
    }
    if (!form.valid) return;

    const payload = this.formatTripPayload(this.newTrip);

    this.tripService.addTrip(payload).subscribe({
      next: () => {
        this.loadTrips();
        this.toggleAddForm();
        alert('Trip added successfully!');
      },
      error: (err) => console.error('Add trip error:', err.error)
    });
  }

  /** Edit trip (only for dispatchers) */
  editTrip(trip: Trip): void {
    if (this.isDriver) {
      alert('Only dispatchers can edit trips.');
      return;
    }

    if (trip.status === TripStatus.Completed) {
      alert('Completed trips cannot be edited.');
      return;
    }

    this.editingTrip = { ...trip };
    this.showAddForm = false;
  }

  /** Update trip (only for dispatchers) */
  updateTrip(form: NgForm): void {
    if (this.isDriver) return;
    if (!form.valid || !this.editingTrip) return;

    const payload = this.formatTripPayload(this.editingTrip);

    this.tripService.updateTrip(payload.tripID, payload).subscribe({
      next: () => {
        this.loadTrips();
        this.editingTrip = undefined;
        alert('Trip updated successfully!');
      },
      error: (err) => console.error('Update trip error:', err.error)
    });
  }

  /** Delete trip (only for dispatchers) */
  deleteTrip(id: number): void {
    if (this.isDriver) return;
    if (!confirm('Are you sure?')) return;

    this.tripService.deleteTrip(id).subscribe({
      next: () => this.loadTrips(),
      error: (err) => console.error(err)
    });
  }

  /** Mark trip as completed */
  markTripCompleted(trip: Trip): void {
    if (trip.status === TripStatus.Completed) {
      alert('Trip is already completed.');
      return;
    }

    // Driver can only complete their own trip
    if (this.isDriver && trip.assignedDriver?.driverName?.toLowerCase() !== this.driverName?.toLowerCase()) {
      alert('You can only complete your assigned trips.');
      return;
    }

    this.tripService.markTripCompleted(trip.tripID).subscribe({
      next: (msg) => {
        alert(msg);
        this.loadTrips();
      },
      error: (err) => {
        console.error('Error completing trip:', err);
        alert('Failed to mark trip as completed.');
      }
    });
  }

  /** Filter long trips (more than 8 hours) */
  getFilteredTrips(): Trip[] {
    if (!this.showLongTripsOnly) return this.trips;

    return this.trips.filter(trip => {
      if (!trip.startTime || !trip.endTime) return false;
      const start = new Date(trip.startTime).getTime();
      const end = new Date(trip.endTime).getTime();
      const durationHours = (end - start) / (1000 * 60 * 60);
      return durationHours > 8;
    });
  }

  toggleLongTrips(): void {
    this.showLongTripsOnly = !this.showLongTripsOnly;
  }
}
