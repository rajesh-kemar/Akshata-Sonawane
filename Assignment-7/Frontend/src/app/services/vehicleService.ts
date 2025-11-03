// vehicle.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../Model/Vehicle.Model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:5114/api/Vehicle'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // GET all vehicles
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  // GET vehicle by ID
  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  // POST - add a new vehicle
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

  // PUT - update a vehicle
  updateVehicle(vehicle: Vehicle): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${vehicle.vehicleID}`, vehicle);
  }

  // DELETE - delete a vehicle
  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
