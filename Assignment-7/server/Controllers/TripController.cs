using Dashboard_TripMangement.Model;
using Dashboard_TripMangement.Service;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard_TripMangement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly ITripService _tripService;

        public TripsController(ITripService tripService)
        {
            _tripService = tripService;
        }

        // GET: api/Trips
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var trips = await _tripService.GetAllAsync();
            return Ok(trips);
        }

        // GET: api/Trips/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var trip = await _tripService.GetByIdAsync(id);
            if (trip == null) return NotFound();
            return Ok(trip);
        }

        // POST: api/Trips
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Trips trip)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _tripService.AddAsync(trip);

            // Reload trip including assigned driver & vehicle
            var createdTrip = await _tripService.GetByIdAsync(trip.TripID);

            return CreatedAtAction(nameof(Get), new { id = createdTrip.TripID }, createdTrip);
        }



        // PUT: api/Trips/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Trips trip)
        {
            if (id != trip.TripID) return BadRequest("Trip ID mismatch");

            await _tripService.UpdateAsync(trip);
            return NoContent();
        }

        // DELETE: api/Trips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _tripService.DeleteAsync(id);
            return NoContent();
        }
    }
}

