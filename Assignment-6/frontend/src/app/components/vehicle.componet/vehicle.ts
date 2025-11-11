import { Component } from '@angular/core';
import { Vehicle } from '../../Models/Vehicle.model';
import { VehicleService } from '../../services/vehicleService';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle.html',
  styleUrls: ['./vehicle.css']
})

 export class VehicleComponent {
  vehicles: Vehicle[] = [];

  newVehicle: Vehicle = {
    vehicleID: 0,
    vehicleType: '',
    capacity: 0,
    status: ''
  };

  editingVehicle: Vehicle | null = null;
  showAddForm: boolean = false;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicle().subscribe({
      next: data => this.vehicles = data,
      error: err => console.error('Error fetching vehicles:', err)
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) this.resetForm();
  }

  addVehicle(form: NgForm) {
    if (form.invalid) return alert('Please fill all required fields.');
    this.vehicleService.addVehicle(this.newVehicle).subscribe(() => {
      this.loadVehicles();
      this.resetForm();
      this.showAddForm = false;
    });
  }

  editVehicle(vehicle: Vehicle) {
    this.editingVehicle = { ...vehicle };
  }

  updateVehicle(form: NgForm) {
    if (form.invalid) return alert('Please fill all required fields.');
    if (this.editingVehicle) {
      this.vehicleService.updateVehicle(this.editingVehicle).subscribe(() => {
        this.loadVehicles();
        this.editingVehicle = null;
      });
    }
  }

  deleteVehicle(id: number) {
    if (confirm('Are you sure?')) {
      this.vehicleService.deleteVehicle(id).subscribe(() => this.loadVehicles());
    }
  }

  resetForm(): void {
    this.newVehicle = { vehicleID: 0, vehicleType: '', capacity: 0, status: '' };
  }
}


