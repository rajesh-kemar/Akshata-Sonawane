import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list';
// import { VehicleDetails } from './vehicle-details/vehicle-details';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,VehicleListComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Vehical-Details-App');
}
