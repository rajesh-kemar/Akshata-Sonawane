using EF_Core_TripMangement.Data;
using EF_Core_TripMangement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EF_Core_TripMangement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TripController(TripDBContext context) : ControllerBase
    {
        private  readonly TripDBContext _context = context;


        [HttpGet]
        public IActionResult GetAllTrips()
        {
            var trips = _context.Trips
                .Include(t => t.AssignedDriver)
                .Include(t => t.AssignedVehicle)
                .ToList();

            return Ok(trips);
        }

        [HttpGet("{id}")]
        public IActionResult GetTripById(int id)
        {
            var trip = _context.Trips
                .Include(t => t.AssignedDriver)
                .Include(t => t.AssignedVehicle)
                .FirstOrDefault(t => t.TripID == id);

            if (trip == null)
                return NotFound(new { message = $"Trip with ID {id} not found." });

            return Ok(trip);
        }

        [HttpPost]
        public IActionResult AddTrip([FromBody] Trip trip)
        {
            trip.StartTime = DateTime.Now;

            if (!Enum.IsDefined(typeof(TripStatus), trip.Status))
                trip.Status = TripStatus.InUse;

            _context.Trips.Add(trip);
            _context.SaveChanges();
            return Ok(trip);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateTrip(int id, [FromBody] Trip trip)
        {
            var existingTrip = _context.Trips
                .Include(t => t.AssignedDriver)
                .Include(t => t.AssignedVehicle)
                .FirstOrDefault(t => t.TripID == id);

            if (existingTrip == null)
                return NotFound(new { message = $"Trip with ID {id} not found." });

            // Update fields
            existingTrip.Source = trip.Source;
            existingTrip.Destination = trip.Destination;
            existingTrip.StartTime = trip.StartTime;
            existingTrip.EndTime = trip.EndTime;
            existingTrip.Status = trip.Status;

            // Update assigned driver/vehicle if needed
            existingTrip.AssignedDriverId = trip.AssignedDriverId;
            existingTrip.AssignedVehicleId = trip.AssignedVehicleId;

            _context.SaveChanges();

            return Ok(existingTrip);
        }

        [HttpPut("{id}/completed")]
        public IActionResult CompleteTrip(int id)
        {
            var trip = _context.Trips.Find(id);
            if (trip == null)
                return NotFound(new { message = $"Trip with ID {id} not found." });

            trip.EndTime = DateTime.Now;
            trip.Status = TripStatus.Completed;

            _context.SaveChanges();
            return Ok(trip);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTrip(int id)
        {
            var trip = _context.Trips.Find(id);
            if (trip == null)
            {
                return NotFound(new { message = $"Trip with ID {id} not found." });
            }

            _context.Trips.Remove(trip);
            _context.SaveChanges();

            return Ok(new { message = $"Trip with ID {id} deleted successfully." });
        }




    }
}
