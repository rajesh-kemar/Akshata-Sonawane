import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { TripsComponent } from './components/trips.Component/trips';
import { VehicleComponent } from './components/vehicle.Component/vehicle';
import { DriverComponent } from './components/driver.Component/driver';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'trip', component: TripsComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'driver', component: DriverComponent },
  { path: '**', redirectTo: '/dashboard' }
];
