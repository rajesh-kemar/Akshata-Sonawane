import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Import FormsModule here
import { FormsModule } from '@angular/forms';
import { VehicleListComponent  } from './vehicle-list/vehicle-list';
import {  VehicleDetailsComponent } from './vehicle-details/vehicle-details';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    VehicleListComponent ,
    VehicleDetailsComponent,
    AppComponent

     
    // Add this here!
  ],
})
export class AppModule { }