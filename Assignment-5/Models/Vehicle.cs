using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EF_Core_TripMangement.Models
{
    public class Vehicle
    {
        public int VehicleID { get; set; }
        public string VehicleType { get; set; }
        public decimal Capacity { get; set; }
        public TripStatus Status { get; set; }

        [JsonIgnore]
        public ICollection<Trip> Trips { get; set; } = new List<Trip>();
    }
}
