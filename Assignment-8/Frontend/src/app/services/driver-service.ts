import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Driver } from '../Models/DriverModel';
import { UserService } from './user-service';
import { DriverSummary } from '../Models/DriverSummary';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = 'http://localhost:5139/api/Driver';
   private cachedSummary: DriverSummary | null = null; // <-- cache


  constructor(private http: HttpClient, private auth: UserService) {}

  // ✅ Helper to attach token to every request
  private get headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken() || ''}`
      })
    };
  }

  // GET all drivers
  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl, this.headers);
  }

  // GET driver by ID
  getDriverById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${id}`, this.headers);
  }

  // POST - add a new driver
  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver, this.headers);
  }

  // PUT - update a driver
  updateDriver(driver: Driver): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${driver.driverID}`, driver, this.headers);
  }

  // DELETE - delete a driver
  deleteDriver(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.headers);
  }

  // GET drivers associated with the logged-in user (requires headers)
  getMyDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl, this.headers);
  }

  // GET driver info based on token (requires headers)
  getDriverByToken(): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/me`, this.headers);
  }

  // Get trip summary for a specific driver
getDriverTripSummary(driverId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${driverId}/summary`, this.headers);
}

 getMySummary(): Observable<DriverSummary> {
    if (this.cachedSummary) {
      // Return cached data if available
      return of(this.cachedSummary);
    }

    return this.http.get<DriverSummary>(`${this.apiUrl}/my-summary`, this.headers).pipe(
      tap(summary => {
        this.cachedSummary = summary; // cache the result
      })
    );
  }

  // Optional: Clear cache on logout
  clearSummaryCache() {
    this.cachedSummary = null;
  }

  // ... other existing methods
}


