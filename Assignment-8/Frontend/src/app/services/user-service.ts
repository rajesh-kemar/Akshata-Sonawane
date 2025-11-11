import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5139/api/User';

  // LocalStorage keys
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private driverNameKey = 'driverName';
  private userIdKey = 'userId';

  // Observables
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string | null>(null);

  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(this.tokenKey);
      const role = localStorage.getItem(this.roleKey);
      if (token) {
        this.isLoggedInSubject.next(true);
        this.roleSubject.next(role);
      }
    }
  }

  // Login method
  login(user: User): Observable<{ token?: string; role: string; userName?: string }> {
    return new Observable(observer => {
      this.http.post<{ token?: string; role: string; userName?: string }>(`${this.apiUrl}/login`, user)
        .subscribe({
          next: (res) => {
            if (res.token) this.saveToken(res.token);
            this.saveRole(res.role);
            if (res.userName) this.setDriverName(res.userName);

            this.isLoggedInSubject.next(true);
            this.roleSubject.next(res.role);

            observer.next(res);
            observer.complete();
          },
          error: (err) => observer.error(err)
        });
    });
  }

  // Save / get driver name
  setDriverName(name: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.driverNameKey, name);
    }
  }

  getDriverName(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.driverNameKey) || '';
    }
    return '';
  }

  // Save / get role
  saveRole(role: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.roleKey, role);
      this.roleSubject.next(role);
    }
  }

  getRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.roleKey);
    }
    return null;
  }

  // Save / get token
  saveToken(token?: string) {
    if (token && typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Logout
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.roleKey);
      localStorage.removeItem(this.driverNameKey);
      localStorage.removeItem(this.userIdKey);
    }
    this.isLoggedInSubject.next(false);
    this.roleSubject.next(null);
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Register
  register(user: User): Observable<User> {
    if (!user.role) user.role = 'Driver';
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Set user info (e.g., after login or registration)
  setUserInfo(user: { userName: string; role: string }) {
    this.setDriverName(user.userName);
    this.saveRole(user.role);
  }
}
