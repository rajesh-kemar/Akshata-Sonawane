import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Trip, TripStatus } from '../../Models/Trip.model';
import { TripService } from '../../services/tripService';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './trip.html',
  styleUrls: ['./trip.css']
})
export class TripComponent implements OnInit {

  trips: Trip[] = [];
  tripStatusEnum = TripStatus;

  newTrip: Trip = {} as Trip;
  editingTrip: Trip | null = null;
  showAddForm: boolean = false;

  

  constructor(private tripService: TripService, private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.loadTrips();
  }

  // Load all trips
  loadTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (data) => this.trips = data,
      error: (err) => console.error('Error loading trips', err)
    });
  }

  // Toggle Add Form
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) this.resetForm();
  }

  // Add new trip
  addTrip(form: NgForm): void {
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => form.controls[field].markAsTouched());
      alert('Please fill all required fields.');
      return;
    }

    this.tripService.addTrip(this.newTrip).subscribe({
      next: () => {
        alert('Trip added successfully!');
        this.loadTrips();
        this.resetForm();
        this.showAddForm = false;
      },
      error: (err) => console.error('Error adding trip', err)
    });
  }

  // Edit trip
  editTrip(trip: Trip): void {
    this.editingTrip = { ...trip };
  }

  // Update trip
  updateTrip(form: NgForm): void {
    if (!this.editingTrip) return;

    if (form.invalid) {
      Object.keys(form.controls).forEach(field => form.controls[field].markAsTouched());
      alert('Please fill all required fields.');
      return;
    }

    this.tripService.updateTrip(this.editingTrip).subscribe({
      next: () => {
        alert('Trip updated successfully!');
        this.loadTrips();
        this.editingTrip = null;
      },
      error: (err) => console.error('Error updating trip', err)
    });
  }

  // Delete trip
  deleteTrip(id: number): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(id).subscribe({
        next: () => this.loadTrips(),
        error: (err) => console.error('Error deleting trip', err)
      });
    }
  }

  // Mark trip as Completed
markTripCompleted(trip: Trip): void {
  if (trip.status === this.tripStatusEnum.Completed) return;

  this.tripService.markTripCompleted(trip.tripID).subscribe({
    next: (updatedTrip) => {
      const index = this.trips.findIndex(t => t.tripID === trip.tripID);
      if (index !== -1) this.trips[index] = updatedTrip;
      this.cdr.detectChanges();
      alert('Trip marked as completed!');
    },
    error: (err) => console.error('Error marking trip as completed', err)
  });
}

  // Reset Add Form
  resetForm(): void {
    this.newTrip = {} as Trip;
  }

}
