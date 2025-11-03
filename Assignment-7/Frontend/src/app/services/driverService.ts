// driver.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../Model/Driver.Model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = 'http://localhost:5114/api/Driver'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // GET all drivers
  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }

  // GET driver by ID
  getDriverById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${id}`);
  }

  // POST - add a new driver
  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver);
  }

  // PUT - update a driver
  updateDriver(driver: Driver): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${driver.driverID}`, driver);
  }

  // DELETE - delete a driver
  deleteDriver(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

