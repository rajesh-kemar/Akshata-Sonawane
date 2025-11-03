import { Vehicle } from "./Vehicle.Model";
import { Driver } from "./Driver.Model";

export enum TripStatus {
  None = 'None',
  InUse = 'InUse',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Available = 'Available'
  // On_Leave ='On_Leave'
}

export interface Trip {
  tripID: number;
  source: string;
  destination: string;
  startTime: string;  // Use string for ISO date from API
  endTime: string;
  status: TripStatus;
  assignedDriverId?: number;  // Send ID only for POST/PUT
  assignedVehicleId?: number; // Send ID only for POST/PUT

  // Optional navigation properties for display only
  assignedDriver?: Driver;
  assignedVehicle?: Vehicle;
}