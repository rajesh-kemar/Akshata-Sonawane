namespace TripManagement.Models


{
    public enum TripStatus
    {
        Available, Inuse, completed, OutOfService
    }

    public class Trip
    {
        public int TripID { get; set; }
        public int DriverId { get; set; }
        public string Source { get; set; } = "";
        public string Destination { get; set; } = "";
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public TripStatus Status { get; set; } = TripStatus.Inuse;





    }
}
