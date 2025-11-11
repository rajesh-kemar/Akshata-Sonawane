import { Routes } from '@angular/router';

import { TripComponent } from './components/trip.component/trip'; // ✅ Proper import
import { DriverComponent } from './components/driver.Component/driver';
import { VehicleComponent } from './components/vehicle.componet/vehicle';
import { AppComponent } from './app';

export const routes: Routes = [
  //{ path: '', redirectTo: 'driver', pathMatch: 'full' }, // ✅ Default route
  { path: '', component: AppComponent },
  { path: 'driver', component: DriverComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'trip', component: TripComponent }
];
