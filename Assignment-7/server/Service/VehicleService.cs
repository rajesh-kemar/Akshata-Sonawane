using Dashboard_TripMangement.Data;
using Dashboard_TripMangement.Model;
using Microsoft.EntityFrameworkCore;
using System;

namespace Dashboard_TripMangement.Service
{
    public class VehicleService : IVehicleService
    {
        private readonly TripDBContext _context;

        public VehicleService(TripDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Vehicle>> GetAllAsync()
        {
            // You can include Trips if needed
            return await _context.Vehicles
                .Include(v => v.Trips)
                .ToListAsync();
        }

        public async Task<Vehicle?> GetByIdAsync(int id)
        {
            return await _context.Vehicles
                .Include(v => v.Trips)
                .FirstOrDefaultAsync(v => v.VehicleID == id);
        }

        public async Task AddAsync(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Vehicle vehicle)
        {
            _context.Vehicles.Update(vehicle);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle != null)
            {
                _context.Vehicles.Remove(vehicle);
                await _context.SaveChangesAsync();
            }
        }
    }
}

