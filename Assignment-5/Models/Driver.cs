using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EF_Core_TripMangement.Models
{
    public class Driver
    {
        public int DriverID { get; set; }
        public string DriverName { get; set; }
        public string LicenseNumber { get; set; }
        public long PhoneNumber { get; set; }
        public int ExperienceYear { get; set; }

        [JsonIgnore]
        public ICollection<Trip> Trips { get; set; } = new List<Trip>();
    }
}
