import { Driver } from "./DriverModel";
import { Vehicle } from "./VehicleModel";


export enum TripStatus {
  None = 'None',
  InUse = 'InUse',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Available = 'Available',
   OnLeve ='OnLeave'
}

export interface Trip {
  tripID: number;
  source: string;
  destination: string;
 startTime?: string | null;  // Nullable
  endTime?: string | null;   
  status: TripStatus;
  assignedDriverId?: number;  // Send ID only for POST/PUT
  assignedVehicleId?: number; // Send ID only for POST/PUT

  // Optional navigation properties for display only
  assignedDriver?: Driver;
  assignedVehicle?: Vehicle;
}