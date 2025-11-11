import { Component, OnInit } from '@angular/core';
import { Driver } from '../../Models/Driver.model';
import { DriverService } from '../../services/driverService';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './driver.html',
  styleUrls: ['./driver.css']
})
export class DriverComponent implements OnInit {
  drivers: Driver[] = [];
  
  newDriver: Driver = {
    driverID: 0,
    driverName: '',
    licenseNumber: '',
    phoneNumber: 0,
    experienceYear: 0
  };

  editingDriver: Driver | null = null;
  showAddForm: boolean = false;

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driverService.getDrivers().subscribe({
      next: (data) => this.drivers = data,
      error: (err) => console.error('Error fetching drivers:', err)
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addDriver(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      alert('Please fill all required fields.');
      return;
    }

    this.driverService.addDriver(this.newDriver).subscribe(() => {
      alert('Driver added successfully!');
      this.loadDrivers();
      this.resetForm();
      this.showAddForm = false;
    });
  }

  editDriver(driver: Driver): void {
    this.editingDriver = { ...driver };
  }

  updateDriver(form: NgForm): void {
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      alert('Please fill all required fields.');
      return;
    }

    if (this.editingDriver) {
      this.driverService.updateDriver(this.editingDriver).subscribe(() => {
        alert('Driver updated successfully!');
        this.loadDrivers();
        this.editingDriver = null;
      });
    }
  }

  deleteDriver(id: number): void {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.driverService.deleteDriver(id).subscribe(() => this.loadDrivers());
    }
  }

  resetForm(): void {
    this.newDriver = {
      driverID: 0,
      driverName: '',
      licenseNumber: '',
      phoneNumber: 0,
      experienceYear: 0
    };
  }
}
