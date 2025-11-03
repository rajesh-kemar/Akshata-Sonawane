import { Component } from '@angular/core';
import { Vehicle } from '../../Model/Vehicle.Model';
import { VehicleService } from '../../services/vehicleService';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle.html',
  styleUrls: ['./vehicle.css'],
})
export class VehicleComponent {
  vehicles: Vehicle[] = [];

  newVehicle: Vehicle = this.resetVehicle(); // For Add form
  showAddForm: boolean = false;

  editingVehicle: Vehicle | null = null; // For Edit form

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  // 🔹 Load all vehicles
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => (this.vehicles = data),
      error: (err) => console.error('Error loading vehicles', err),
    });
  }

  // 🔹 Reset vehicle object
  resetVehicle(): Vehicle {
    return {
      vehicleID: 0,
      vehicleType: '',
      capacity: 0,
      status: 'Available',
    };
  }

  // 🔹 Toggle Add form
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.newVehicle = this.resetVehicle(); // Reset form
    this.editingVehicle = null; // Hide edit form if open
  }

  // 🔹 Add vehicle
  addVehicle(form: NgForm): void {
    if (!form.valid) return;

    this.vehicleService.addVehicle(this.newVehicle).subscribe({
      next: () => {
        this.loadVehicles();
        this.toggleAddForm(); // Hide form after adding
      },
      error: (err) => console.error('Error adding vehicle', err),
    });
  }

  // 🔹 Edit vehicle
  editVehicle(vehicle: Vehicle): void {
    this.editingVehicle = { ...vehicle }; // Copy object
    this.showAddForm = false; // Hide Add form if open
  }

  // 🔹 Update vehicle
  updateVehicle(form: NgForm): void {
    if (!form.valid || !this.editingVehicle) return;

    this.vehicleService.updateVehicle(this.editingVehicle).subscribe({
      next: () => {
        this.loadVehicles();
        this.editingVehicle = null;
      },
      error: (err) => console.error('Error updating vehicle', err),
    });
  }

  // 🔹 Cancel edit
  cancelEdit(): void {
    this.editingVehicle = null;
  }

  // 🔹 Delete vehicle
  deleteVehicle(id: number): void {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    this.vehicleService.deleteVehicle(id).subscribe({
      next: () => this.loadVehicles(),
      error: (err) => console.error('Error deleting vehicle', err),
    });
  }
}
