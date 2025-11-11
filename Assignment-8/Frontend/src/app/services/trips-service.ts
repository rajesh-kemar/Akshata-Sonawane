import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../Models/TripModel';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:5139/api/Trips';

  constructor(private http: HttpClient, private auth: UserService) {}

  private get headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl, this.headers);
  }

  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`, this.headers);
  }

  addTrip(trip: Partial<Trip>): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip, this.headers);
  }

  updateTrip(id: number, trip: Partial<Trip>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, trip, this.headers);
  }

  deleteTrip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.headers);
  }

  // ✅ Correct method to mark trip as completed
  markTripCompleted(tripId: number): Observable<string> {
  return this.http.put<string>(
    `${this.apiUrl}/complete/${tripId}`,
    {},
    {
      ...this.headers,
      responseType: 'text' as 'json'  // 👈 keep this
    }
  );
}


}
