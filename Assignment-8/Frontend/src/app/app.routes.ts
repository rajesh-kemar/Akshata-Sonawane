import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { TripsComponent } from './components/trips-component/trips-component';
import { VehicleComponent } from './components/vehicle-component/vehicle-component';
import { DriverComponent } from './components/driver-component/driver-component';
import { LoginComponent } from './components/login-component/login-component';
import { HomeComponent } from './components/home/home';
import { RegisterComponent } from './components/register-component/register-component';
import { TripSummary } from './components/trip-summary/trip-summary';


export const routes: Routes = [
  // Redirect empty path to login page
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // Authentication
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  // Main dashboard and other pages
  { path: 'dashboard', component: Dashboard },
  { path: 'trip', component: TripsComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'driver', component: DriverComponent },
   { path: 'trip-summary', component: TripSummary },

  // Wildcard route for unknown URLs
  { path: '**', redirectTo: '/home' }
];

