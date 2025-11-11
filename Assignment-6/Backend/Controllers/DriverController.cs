using EF_Core_TripMangement.Data;
using EF_Core_TripMangement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EF_Core_TripMangement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DriverController : ControllerBase
    {
        private readonly TripDBContext _context;

        public DriverController(TripDBContext context)
        {
            _context = context;
        }

     
        [HttpPost]
        public IActionResult AddDriverWithTrips([FromBody] Driver driver)
        {
            if (driver == null)
                return BadRequest("Driver is null");

            foreach (var trip in driver.Trips)
            {
                trip.AssignedDriverId = driver.DriverID;
                trip.AssignedDriver = driver;

                if (trip.AssignedVehicle != null)
                {
                    var existingVehicle = _context.Vehicles
                        .FirstOrDefault(v => v.VehicleID == trip.AssignedVehicle.VehicleID);

                    if (existingVehicle == null)
                    {
                        _context.Vehicles.Add(trip.AssignedVehicle);
                    }
                    else
                    {
                        trip.AssignedVehicleId = existingVehicle.VehicleID;
                        trip.AssignedVehicle = existingVehicle;
                    }
                }
            }

            _context.Drivers.Add(driver);
            _context.SaveChanges();

            return Ok(driver);
        }

     
        [HttpGet]
        public IActionResult GetAllDrivers()
        {
            var drivers = _context.Drivers.Include(d => d.Trips).ToList();
            return Ok(drivers);
        }

        
        [HttpGet("{id}")]
        public IActionResult GetDriverById(int id)
        {
            var driver = _context.Drivers
                .Include(d => d.Trips)
                .ThenInclude(t => t.AssignedVehicle)
                .FirstOrDefault(d => d.DriverID == id);

            if (driver == null)
                return NotFound($"Driver with ID {id} not found");

            return Ok(driver);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDriver(int id, [FromBody] Driver updatedDriver)
        {
            if (id != updatedDriver.DriverID)
                return BadRequest("Driver ID mismatch");

            var driver = _context.Drivers.Find(id);
            if (driver == null)
                return NotFound($"Driver with ID {id} not found");

            driver.DriverName = updatedDriver.DriverName;
            driver.LicenseNumber = updatedDriver.LicenseNumber;
            driver.PhoneNumber = updatedDriver.PhoneNumber;
            driver.ExperienceYear = updatedDriver.ExperienceYear;

            _context.SaveChanges();
            return Ok(driver);
        }

       
        [HttpDelete("{id}")]
        public IActionResult DeleteDriver(int id)
        {
            var driver = _context.Drivers
                .Include(d => d.Trips)
                .FirstOrDefault(d => d.DriverID == id);

            if (driver == null)
                return NotFound($"Driver with ID {id} not found");

            if (driver.Trips.Any())
                return BadRequest("Cannot delete a driver who has trips. Remove trips first.");

            _context.Drivers.Remove(driver);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
