import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details';


interface Vehicle {
  id: number;
  numberPlate: string;
  type: string;
  status: string;
  capacity: number;
}

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FormsModule, VehicleDetailsComponent],
  templateUrl: './vehicle-list.html',
  styleUrls: ['./vehicle-list.css']
})
export class VehicleListComponent {
  vehicles: Vehicle[] = [
    { id: 1, numberPlate: 'MH22b23', type: 'Truck', status: 'Available', capacity: 10 },
    { id: 2, numberPlate: 'MH11d23', type: 'Van', status: 'Inuse', capacity: 8 },
    { id: 3, numberPlate: 'UP12b23', type: 'Truck', status: 'Available', capacity: 11 },
    { id: 4, numberPlate: 'MH44e87', type: 'Van', status: 'Inuse', capacity: 7 },
  ];

  showAvailableOnly = false;
  selectedVehicle: Vehicle | null = null;

  toggleFilter() {
    this.showAvailableOnly = !this.showAvailableOnly;
  }

  selectVehicle(vehicle: Vehicle  | null) {
    this.selectedVehicle = vehicle;
  }

  get filteredVehicles() {
    return this.showAvailableOnly
      ? this.vehicles.filter(v => v.status === 'Available')
      : this.vehicles;
  }
}
