import { Vehicle } from "./Vehicle.model";
import { Driver } from "./Driver.model";

export enum TripStatus{
    None = 'None',
  InUse = 'InUse',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Available = 'Available'
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
