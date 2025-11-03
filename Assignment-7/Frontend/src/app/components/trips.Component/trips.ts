import { Component } from '@angular/core';
import { Trip, TripStatus } from '../../Model/Trip.Model';
import { TripService } from '../../services/tripsService';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trips.html',
  styleUrls: ['./trips.css']
})
export class TripsComponent {
  trips: Trip[] = [];
  newTrip: Partial<Trip> = {};
  editingTrip: Trip | undefined;
  showAddForm: boolean = false;
  tripStatusEnum = TripStatus;

  showLongTripsOnly: boolean = false; // NEW: flag to filter long trips

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripService.getAllTrips().subscribe({
      next: (data) => (this.trips = data),
      error: (err) => console.error(err)
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.newTrip = {};
    this.editingTrip = undefined;
  }

  addTrip(form: NgForm): void {
    if (!form.valid) return;

    this.tripService.addTrip(this.newTrip).subscribe({
      next: () => {
        this.loadTrips();
        this.toggleAddForm();
      },
      error: (err) => console.error(err)
    });
  }

  editTrip(trip: Trip): void {
    this.editingTrip = { ...trip };
    this.showAddForm = false;
  }

  updateTrip(form: NgForm): void {
    if (!form.valid || !this.editingTrip) return;

    this.tripService.updateTrip(this.editingTrip.tripID, this.editingTrip).subscribe({
      next: () => {
        this.loadTrips();
        this.editingTrip = undefined;
      },
      error: (err) => console.error(err)
    });
  }

  deleteTrip(id: number): void {
    if (!confirm('Are you sure?')) return;

    this.tripService.deleteTrip(id).subscribe({
      next: () => this.loadTrips(),
      error: (err) => console.error(err)
    });
  }

  markTripCompleted(trip: Trip): void {
    const updatedTrip: Partial<Trip> = { ...trip, status: TripStatus.Completed };
    this.tripService.updateTrip(trip.tripID, updatedTrip).subscribe({
      next: () => this.loadTrips(),
      error: (err) => console.error(err)
    });
  }

  // NEW: filter trips longer than 8 hours
  getFilteredTrips(): Trip[] {
    if (!this.showLongTripsOnly) return this.trips;

    return this.trips.filter(trip => {
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
