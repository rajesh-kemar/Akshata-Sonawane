import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverSummary } from '../../Models/DriverSummary';
import { DriverService } from '../../services/driver-service';

@Component({
  selector: 'app-trip-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-summary.html',
  styleUrls: ['./trip-summary.css'], // fixed typo
})
export class TripSummary implements OnInit {
  driverSummary: DriverSummary | null = null;
  errorMessage = '';

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
   this.driverService.getMySummary().subscribe({
  next: (summary) => {
    this.driverSummary = summary;
  },
  error: (err) => {
    console.error(err);
    this.errorMessage = 'Failed to load trip summary';
  }
});

}
}
