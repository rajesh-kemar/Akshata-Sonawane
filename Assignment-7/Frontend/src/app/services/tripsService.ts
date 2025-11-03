import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../Model/Trip.Model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = 'http://localhost:5114/api/Trips'; // Your API URL

  constructor(private http: HttpClient) { }

  // GET all trips
  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  // GET a trip by ID
  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`);
  }

  // POST a new trip
  addTrip(trip: Partial<Trip>): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  // PUT/update a trip
  updateTrip(id: number, trip: Partial<Trip>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, trip);
  }

  // DELETE a trip
  deleteTrip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

