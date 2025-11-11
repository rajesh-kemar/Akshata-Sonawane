import { TripStatus } from "./TripModel";

export interface Vehicle{
    vehicleID ?: number,
    vehicleType: string,
    capacity: number,
    numberPlate:string,
    status: TripStatus
}