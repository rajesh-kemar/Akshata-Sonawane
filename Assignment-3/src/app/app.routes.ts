import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list';
import { NgModule } from '@angular/core';

export const routes: Routes = [
   { path: '', redirectTo: 'vehicle-list', pathMatch: 'full' },
{ path: 'vehicle-list', component: VehicleListComponent },


];
// @NgModule({
//     imports:[RouterModule.forRoot(routes)],
//     exports:[RouterModule]
// })
// export class AppRoutingModule{}
