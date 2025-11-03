import { Component } from '@angular/core';
import { Driver } from '../../Model/Driver.Model';
import { DriverService } from '../../services/driverService';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './driver.html',
  styleUrls: ['./driver.css'],
})
export class DriverComponent {
  drivers: Driver[] = [];
  newDriver: Driver = {} as Driver; // For Add form
  showAddForm: boolean = false;

  editingDriver: Driver | null = null; // For Edit form

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  // Load all drivers
  loadDrivers(): void {
    this.driverService.getDrivers().subscribe({
      next: (data) => (this.drivers = data),
      error: (err) => console.error('Error loading drivers', err),
    });
  }

  // Toggle Add form visibility
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.newDriver = {} as Driver; // Reset form
  }

  // Add a new driver
  addDriver(form: NgForm): void {
    if (!form.valid) return;

    this.driverService.addDriver(this.newDriver).subscribe({
      next: () => {
        this.loadDrivers();
        this.toggleAddForm(); // Hide form after saving
      },
      error: (err) => console.error('Error adding driver', err),
    });
  }

  // Edit driver
  editDriver(driver: Driver): void {
    this.editingDriver = { ...driver }; // Copy for editing
    this.showAddForm = false; // Hide Add form if open
  }

  // Update driver
  updateDriver(form: NgForm): void {
    if (!form.valid || !this.editingDriver) return;

    this.driverService.updateDriver(this.editingDriver).subscribe({
      next: () => {
        this.loadDrivers();
        this.editingDriver = null;
      },
      error: (err) => console.error('Error updating driver', err),
    });
  }

  // Cancel edit
  cancelEdit(): void {
    this.editingDriver = null;
  }

  // Delete driver
  deleteDriver(id: number): void {
    if (!confirm('Are you sure you want to delete this driver?')) return;

    this.driverService.deleteDriver(id).subscribe({
      next: () => this.loadDrivers(),
      error: (err) => console.error('Error deleting driver', err),
    });
  }
}
