using System.ComponentModel.DataAnnotations;
using System.Net.NetworkInformation;
using System.Text.Json.Serialization;

namespace Dashboard_TripMangement.Model
{
    public enum TripStatus
    {
        None,
        InUse,
        Completed,
        Cancelled,
        Available
    }
    public class Trips
    {
        [Key]
        public int TripID { get; set; }
        [Required]
        public string Source { get; set; }
        [Required]
        public string Destination { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public TripStatus Status { get; set; }

        [JsonIgnore]
        public int? AssignedDriverId { get; set; }
        [JsonIgnore]
        public int? AssignedVehicleId { get; set; }

        // Navigation properties
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Driver? AssignedDriver { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public Vehicle? AssignedVehicle { get; set; }
    }

}
