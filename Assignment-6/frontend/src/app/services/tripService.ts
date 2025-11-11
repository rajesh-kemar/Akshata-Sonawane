import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../Models/Trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = 'http://localhost:5053/Trip'; 

  constructor(private http: HttpClient) { }

  // Get all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }
markTripCompleted(id: number): Observable<Trip> {
  // Call your backend endpoint: PUT /Trip/{id}/completed
  return this.http.put<Trip>(`${this.apiUrl}/${id}/completed`, {});
}
  

  // Add new trip
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  // Update trip
  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/${trip.tripID}`, trip);
  }

  // Delete trip
  deleteTrip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

