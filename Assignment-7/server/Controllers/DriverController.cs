using Dashboard_TripMangement.Model;
using Dashboard_TripMangement.Service;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard_TripMangement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController :ControllerBase
    {
        private readonly IDriverService _driverService;

        public DriverController(IDriverService driverService)
        {
            _driverService = driverService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var vehicles = await _driverService.GetAllAsync();
            return Ok(vehicles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var driver = await _driverService.GetByIdAsync(id);  // Correct variable
            if (driver == null) return NotFound();
            return Ok(driver);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Driver driver)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _driverService.AddAsync(driver);
            return CreatedAtAction(nameof(Get), new { id = driver.DriverID }, driver);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Driver driver)
        {
            if (id != driver.DriverID) return BadRequest("Driver ID mismatch");
            await _driverService.UpdateAsync(driver);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _driverService.DeleteAsync(id);
            return NoContent();
        }




    }
}
