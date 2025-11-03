import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ import Router
import { TripService } from '../../services/tripsService';
import { DriverService } from '../../services/driverService';
import { VehicleService } from '../../services/vehicleService';
import { Trip, TripStatus } from '../../Model/Trip.Model';
import { Driver } from '../../Model/Driver.Model';
import { Vehicle } from '../../Model/Vehicle.Model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [TripService, DriverService, VehicleService],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  trips: Trip[] = [];
  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];

  activeTrips = 0;
  completedTrips = 0;
  availableDrivers = 0;
  availableVehicles = 0;

  constructor(
    private tripService: TripService,
    private driverService: DriverService,
    private vehicleService: VehicleService,
    private router: Router // ✅ inject Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.tripService.getAllTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.activeTrips = trips.filter(t => t.status === TripStatus.InUse || t.status === TripStatus.None).length;
        this.completedTrips = trips.filter(t => t.status === TripStatus.Completed).length;
      },
      error: (err) => console.error('Error loading trips', err)
    });

    this.driverService.getDrivers().subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        this.availableDrivers = drivers.filter(d => d.status === 'Available' || d.status === 'None').length;
      },
      error: (err) => console.error('Error loading drivers', err)
    });

    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.availableVehicles = vehicles.filter(v => v.status === 'Available' || v.status === 'None').length;
      },
      error: (err) => console.error('Error loading vehicles', err)
    });
  }

  // ✅ Add this method so template can use it
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
