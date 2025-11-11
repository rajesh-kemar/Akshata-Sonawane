
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../Models/Vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:5053/api/Vehicle'; 

  constructor(private http: HttpClient) { }

  // Get all drivers
  getVehicle(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  // Get driver by ID
  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  // Add new driver
  addVehicle(driver: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, driver);
  }

  // Update driver
  updateVehicle(driver: Vehicle): Observable<Vehicle> {
  return this.http.put<Vehicle>(`${this.apiUrl}/${driver.vehicleID}`, driver);
}

  // Delete driver
  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
