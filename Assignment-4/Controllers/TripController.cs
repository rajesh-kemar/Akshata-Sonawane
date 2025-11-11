using Microsoft.AspNetCore.Mvc;
using TripManagement.Models;

namespace TripManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TripController : ControllerBase
    {
        private static List<Trip> trips = new List<Trip>
        {
            new Trip { TripID = 101,DriverId=1, Source = "Mumbai", Destination = "Nagpur", StartTime = DateTime.Now.AddHours(-5), EndTime = DateTime.Now, Status=TripStatus.Inuse },
            new Trip { TripID = 102, DriverId=2,Source = "Latur", Destination = "Pune", StartTime = DateTime.Now.AddHours(-2), EndTime = DateTime.Now,Status=TripStatus.completed },
            new Trip { TripID = 103, DriverId=3,Source = "Nashik", Destination = "Amravati", StartTime = DateTime.Now.AddHours(-4), EndTime = DateTime.Now ,Status=TripStatus.Available}
        };

        [HttpGet]
        public ActionResult<IEnumerable<Trip>> GetTrips()
        {
            return Ok(trips);
        }
        [HttpPost]
        public ActionResult<Trip>
            CreateTrip([FromBody] Trip newTrip)
        {
            newTrip.TripID = trips.Count + 1;
            newTrip.Status = TripStatus.Inuse;
            newTrip.StartTime = DateTime.Now;
            trips.Add(newTrip);
            return CreatedAtAction(nameof(GetTrips), new
            {
                id = newTrip.
                TripID
            });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTrip(int id, [FromBody] Trip updatedTrip)
        {
            var trip = trips.FirstOrDefault(t => t.TripID == id);

            if (trip == null)
                return NotFound($"Trip with ID {id} not found.");

            trip.Destination = updatedTrip.Destination;
            trip.Status = updatedTrip.Status;
            trip.EndTime = DateTime.Now;

            return Ok(trip);
        }
        [HttpGet("drivers/{driverId}/trips")]
        public ActionResult<IEnumerable<Trip>>
            getTripsByDriver(int driverId)
        {
            var driverTrips = trips.Where(t => t.DriverId == driverId).ToList();
            if (!driverTrips.Any())
                return NotFound($"No trips found for driver");
            return Ok(driverTrips);
        }
    }
       

        
          
        }
    

