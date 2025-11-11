import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../Models/VehicleModel';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:5139/api/Vehicle'; // ✅ Replace with your API endpoint

  constructor(private http: HttpClient, private auth: UserService) {}

  // ✅ Helper to attach token to every request
  private get headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  // GET all vehicles
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl, this.headers);
  }

  // GET vehicle by ID
  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`, this.headers);
  }

  // POST - add a new vehicle
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle, this.headers);
  }

  // PUT - update a vehicle
  updateVehicle(vehicle: Vehicle): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${vehicle.vehicleID}`, vehicle, this.headers);
  }

  // DELETE - delete a vehicle
  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.headers);
  }
}

