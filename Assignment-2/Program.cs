using System;
using System.Globalization;
using System.Collections.Generic;
namespace TripMangement
{
    public enum VStatus
    {
        Available, Inuse, UnderMaintenance, OutOfService
    }

    public class Driver(int driverID, string driverName, string licenseNumber, long phoneNumber, int experienceYear)
    {
       
        public int DriverID { get; set; } = driverID;
        public string DriverName { get; set; } = driverName;
        public string LicenseNumber { get; set; } = licenseNumber;
        public long PhoneNumber { get; set; } = phoneNumber;
        public int ExperienceYear { get; set; } = experienceYear;

        public override string ToString()
        {

            return $"Name :{DriverName},License :{LicenseNumber},Experience :{ExperienceYear}";
        }

    }
    public class Vehical
    {

        public int vehicleID { get; set; }
        public string NumberPlate { get; set; }
        public string VehicalType { get; set; }
        public decimal Capacity { get; set; }
        public  VStatus Status { get; set; }

        public Vehical() { }
        public Vehical(int vehicalid, string numberplate, string vehicaltype, decimal capacity, VStatus status)
        {
            vehicleID = vehicalid;
            NumberPlate = numberplate;
            VehicalType = vehicaltype;
            Capacity = capacity;
            Status = status;
        }
        public override string ToString()
        {
            return $"vehicalid :{vehicleID},NumberPlate :{NumberPlate},VehicalType :{VehicalType},Capacity:{Capacity},Status :{Status}";
        }

    }

    public class Truck : Vehical
    {
        public double LoadCapacity { get; set; }
        public Truck()
        {
            VehicalType = "Truck";
                
        
        }
        public override string ToString()
        {
            return base.ToString() + $", LoadCapacity: {LoadCapacity}";
        }
    }

    public class Van : Vehical
    {
        public double LCapacity { get; set; }
        public Van()
        {
            VehicalType = "Van";
        
        }
    
    }
    public class Trip
    {
        public int TripID { get; set; }

        public Driver AssignedDriver { get; private set; }
        public Vehical AssignedVehical { get; private set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public void AssignDriver(Driver driver)
        {
            AssignedDriver = driver;
        
        }
        public void AssignVehicla(Vehical vechical)
        {
            AssignedVehical = vechical;
        
        }
        public TimeSpan GetDeuration()
        {
            return EndTime - StartTime;
                
        }

        public override string ToString()
        {
            return $"Trip ID: {TripID}, From: {Source} → To: {Destination}, " +
                   $"Driver: {AssignedDriver?.DriverName}, Vehicle: {AssignedVehical?.VehicalType}, " +
                   $"Duration: {GetDeuration()}";
        }


    }

    class Program
    {
        public static void Main(string[] args)
        {
            var drivers = new List<Driver>
            {
                new Driver(1, "Ravi", "ABC-1233", 9902234554, 5),
                new Driver(2, "Sneha", "XYZ-9876", 9876543210, 2),
                new Driver(3, "Ajay", "LMN-4567", 9911122233, 6)
            };

            var vehicles = new List<Vehical>
            {
                new Truck { vehicleID  = 1, NumberPlate = "KA-01-TRK-123", Capacity = 12.5m, LoadCapacity = 5000, Status = VStatus.Available },
                new Van   { vehicleID  = 2, NumberPlate = "KA-02-VAN-456", Capacity = 7.5m, LCapacity = 1000, Status = VStatus.UnderMaintenance },
                new Van   { vehicleID = 3, NumberPlate = "KA-03-VAN-789", Capacity = 6.5m, LCapacity = 800, Status = VStatus.Available }
            };

            var trips = new List<Trip>
            {
                new Trip { TripID = 100, Source = "Mumbai", Destination = "Nagpur", StartTime = DateTime.Now.AddHours(-5), EndTime = DateTime.Now },
                new Trip { TripID = 101, Source = "Latur", Destination = "Pune", StartTime = DateTime.Now.AddHours(-2), EndTime = DateTime.Now },
                new Trip { TripID = 102, Source = "Nashik", Destination = "Amravati", StartTime = DateTime.Now.AddHours(-4), EndTime = DateTime.Now }
            };

            trips[0].AssignDriver(drivers[0]);
            trips[0].AssignVehicla(vehicles[0]);

            trips[1].AssignDriver(drivers[2]);
            trips[1].AssignVehicla(vehicles[2]);

            trips[2].AssignDriver(drivers[1]);
            trips[2].AssignVehicla(vehicles[1]);

            var experiencedDrivers = drivers.Where(d => d.ExperienceYear > 5);

            Console.WriteLine("Drivers with more than 5 years experience:");
            foreach (var d in experiencedDrivers)
            {
                Console.WriteLine(d);
            }

            var assignedTrips = trips.Where(t => t.AssignedDriver != null && t.AssignedVehical != null);

            Console.WriteLine("\nAssigned Trip Details:");
            foreach (var trip in assignedTrips)
            {
                Console.WriteLine(trip);
            }

        }

            


}
}