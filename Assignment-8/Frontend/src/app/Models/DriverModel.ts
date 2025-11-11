import { TripStatus } from "./TripModel";

export interface Driver {
 driverID: number,
  driverName: string,
  licenseNumber: string,
  phoneNumber: number,
  experienceYear: number,
  status:TripStatus
}