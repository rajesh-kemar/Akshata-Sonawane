import { Component, ChangeDetectorRef } from '@angular/core';
import { Vehicle } from '../../Models/VehicleModel';
import { VehicleService } from '../../services/vehicle-service';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripStatus } from '../../Models/TripModel';

@Component({
  selector: 'app-vehicle-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-component.html',
  styleUrls: ['./vehicle-component.css'],
})
export class VehicleComponent {
  vehicles: Vehicle[] = [];

  newVehicle: Vehicle = this.resetVehicle(); // For Add form
  showAddForm: boolean = false;

  editingVehicle: Vehicle | null = null; // For Edit form

  constructor(private vehicleService: VehicleService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  // Load all vehicles
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.cd.detectChanges(); // Prevent ExpressionChangedAfterItHasBeenCheckedError
      },
      error: (err) => console.error('Error loading vehicles', err),
    });
  }

  // Reset vehicle object
  resetVehicle(): Vehicle {
    return {
      vehicleID: 0,
      vehicleType: '',
      capacity: 0,
      numberPlate: '',
      status: TripStatus.Available,
    };
  }

  // Toggle Add form
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.newVehicle = this.resetVehicle();
    this.editingVehicle = null; // Hide edit form if open
  }

  // Add vehicle
  addVehicle(form: NgForm): void {
    form.control.markAllAsTouched();

    // Frontend validation
    if (!form.valid || !this.newVehicle.vehicleType || !this.newVehicle.numberPlate || this.newVehicle.capacity <= 0) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    // Avoid sending vehicleID to backend
    const vehicleToSend = { ...this.newVehicle };
    delete vehicleToSend.vehicleID;

    this.vehicleService.addVehicle(vehicleToSend as Vehicle).subscribe({
      next: () => {
        this.loadVehicles();
        this.toggleAddForm();
        alert('Vehicle added successfully!');
      },
      error: (err) => {
        console.error('Error adding vehicle', err);
        alert('Failed to add vehicle. Please check all fields.');
      },
    });
  }

  // Edit vehicle
  editVehicle(vehicle: Vehicle): void {
    this.editingVehicle = { ...vehicle };
    this.showAddForm = false; // Hide add form if open
  }

  // Update vehicle
  updateVehicle(form: NgForm): void {
    form.control.markAllAsTouched();

    if (!form.valid || !this.editingVehicle || !this.editingVehicle.vehicleType || !this.editingVehicle.numberPlate || this.editingVehicle.capacity <= 0) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.vehicleService.updateVehicle(this.editingVehicle).subscribe({
      next: () => {
        this.loadVehicles();
        this.editingVehicle = null;
        alert('Vehicle updated successfully!');
      },
      error: (err) => {
        console.error('Error updating vehicle', err);
        alert('Failed to update vehicle. Please check all fields.');
      },
    });
  }

  // Cancel edit
  cancelEdit(): void {
    this.editingVehicle = null;
  }

  // Delete vehicle
  deleteVehicle(id: number): void {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    this.vehicleService.deleteVehicle(id).subscribe({
      next: () => {
        this.loadVehicles();
        alert('Vehicle deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting vehicle', err);
        alert('Failed to delete vehicle.');
      },
    });
  }
}
