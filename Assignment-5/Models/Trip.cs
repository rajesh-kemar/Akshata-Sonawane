using System;
using System.Text.Json.Serialization;

namespace EF_Core_TripMangement.Models
{
    public enum TripStatus
    {
        None ,
        InUse ,
        Completed,
        Cancelled,
        Available
    }

    public class Trip
    {
        public int TripID { get; set; }

       

        public string Source { get; set; }
        public string Destination { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public TripStatus Status { get; set; }
        [JsonIgnore]
        public int ? AssignedDriverId { get; set; }

        public int ? AssignedVehicleId { get; set; }

        public Driver? AssignedDriver { get; set; }
        public Vehicle? AssignedVehicle { get; set; }
    }
}
