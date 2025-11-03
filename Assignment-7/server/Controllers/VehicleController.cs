using Dashboard_TripMangement.Model;
using Dashboard_TripMangement.Service;

using Microsoft.AspNetCore.Mvc;

namespace Dashboard_TripMangement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        // GET: api/Vehicle
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var vehicles = await _vehicleService.GetAllAsync();
            return Ok(vehicles);
        }

        // GET: api/Vehicle/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var vehicle = await _vehicleService.GetByIdAsync(id);
            if (vehicle == null) return NotFound();
            return Ok(vehicle);
        }

        // POST: api/Vehicle
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Vehicle vehicle)
        {
            // Validate model
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Save the vehicle using your service
            await _vehicleService.AddAsync(vehicle);

            // Return 201 Created with a link to the newly created vehicle
            return CreatedAtAction(nameof(Get), new { id = vehicle.VehicleID }, vehicle);
        }


        // PUT: api/Vehicle/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Vehicle vehicle)
        {
            if (id != vehicle.VehicleID) return BadRequest("Vehicle ID mismatch");
            await _vehicleService.UpdateAsync(vehicle);
            return NoContent();
        }

        // DELETE: api/Vehicle/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _vehicleService.DeleteAsync(id);
            return NoContent();
        }
    }
}
