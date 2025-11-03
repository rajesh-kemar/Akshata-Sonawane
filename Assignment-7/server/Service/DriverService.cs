using Dashboard_TripMangement.Data;
using Dashboard_TripMangement.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dashboard_TripMangement.Service
{
    public class DriverService : IDriverService
    {
        private readonly TripDBContext _context;

        public DriverService(TripDBContext context)
        {
            _context = context;
        }

        // Get all drivers
        public async Task<IEnumerable<Driver>> GetAllAsync()
        {
            // Include Trips if needed
            return await _context.Drivers
                .Include(d => d.Trips)
                .ToListAsync();
        }

        // Get driver by ID
        public async Task<Driver?> GetByIdAsync(int id)
        {
            return await _context.Drivers
                .Include(d => d.Trips)
                .FirstOrDefaultAsync(d => d.DriverID == id);
        }

        // Add a new driver
        public async Task AddAsync(Driver driver)
        {
            _context.Drivers.Add(driver);
            await _context.SaveChangesAsync();
        }

        // Update existing driver
        public async Task UpdateAsync(Driver driver)
        {
            _context.Drivers.Update(driver);
            await _context.SaveChangesAsync();
        }

        // Delete driver by ID
        public async Task DeleteAsync(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);
            if (driver != null)
            {
                _context.Drivers.Remove(driver);
                await _context.SaveChangesAsync();
            }
        }
    }
}
