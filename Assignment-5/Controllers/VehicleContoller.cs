using EF_Core_TripMangement.Data;
using EF_Core_TripMangement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class VehicleController : ControllerBase
{
    private readonly TripDBContext _context;

    public VehicleController(TripDBContext context)
    {
        _context = context;
    }

 
    [HttpGet]
    public IActionResult GetAllVehicles()
    {
        var vehicles = _context.Vehicles.ToList();
        return Ok(vehicles);
    }

 
    [HttpGet("{id}")]
    public IActionResult GetVehicleById(int id)
    {
        var vehicle = _context.Vehicles.Find(id);
        if (vehicle == null)
            return NotFound($"Vehicle with ID {id} not found");

        return Ok(vehicle);
    }

    [HttpPost]
public IActionResult AddVehicles([FromBody] List<Vehicle> vehicles)
{
    if (vehicles == null || !vehicles.Any())
        return BadRequest("No vehicles provided.");

    _context.Vehicles.AddRange(vehicles);
    _context.SaveChanges();

    return Ok(vehicles);
}

    [HttpPut("{id}")]
    public IActionResult UpdateVehicle(int id, [FromBody] Vehicle updatedVehicle)
    {
        if (id != updatedVehicle.VehicleID)
            return BadRequest("Vehicle ID mismatch");

        var vehicle = _context.Vehicles.Find(id);
        if (vehicle == null)
            return NotFound($"Vehicle with ID {id} not found");

        vehicle.VehicleType = updatedVehicle.VehicleType;
        vehicle.Capacity = updatedVehicle.Capacity;
        vehicle.Status = updatedVehicle.Status;

        _context.SaveChanges();
        return Ok(vehicle);
    }

  
    [HttpDelete("{id}")]
    public IActionResult DeleteVehicle(int id)
    {
        var vehicle = _context.Vehicles.Find(id);
        if (vehicle == null)
            return NotFound($"Vehicle with ID {id} not found");

        _context.Vehicles.Remove(vehicle);
        _context.SaveChanges();

        return NoContent();
    }

 
    [HttpGet("available")]
    public IActionResult GetAvailableVehicles()
    {
        var vehicles = _context.Vehicles
            .Include(v => v.Trips)
            .Where(v => !v.Trips.Any(t => t.Status == TripStatus.InUse))
            .ToList();

        return Ok(vehicles);
    }
}
