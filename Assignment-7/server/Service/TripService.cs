using Dashboard_TripMangement.Data;
using Dashboard_TripMangement.Model;
using Microsoft.EntityFrameworkCore;

namespace Dashboard_TripMangement.Service
{
    public class TripService : ITripService
    {
        private readonly TripDBContext _context;

        public TripService(TripDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Trips>> GetAllAsync()
        {
            return await _context.Trips
                .Include(t => t.AssignedDriver)
                .Include(t => t.AssignedVehicle)
                .ToListAsync();
        }

        public async Task<Trips?> GetByIdAsync(int id)
        {
            return await _context.Trips
                .Include(t => t.AssignedDriver)
                .Include(t => t.AssignedVehicle)
                .FirstOrDefaultAsync(t => t.TripID == id);
        }

        public async Task AddAsync(Trips trip)
        {
            // Only assign driver/vehicle if trip is NOT Completed
            if (trip.Status != TripStatus.Completed)
            {
                var availableDriver = await _context.Drivers
                    .FirstOrDefaultAsync(d => d.Status == TripStatus.Available);
                var availableVehicle = await _context.Vehicles
                    .FirstOrDefaultAsync(v => v.Status == TripStatus.Available);

                if (availableDriver == null || availableVehicle == null)
                    throw new InvalidOperationException("No available driver or vehicle found.");

                trip.AssignedDriverId = availableDriver.DriverID;
                trip.AssignedVehicleId = availableVehicle.VehicleID;

                availableDriver.Status = TripStatus.InUse;
                availableVehicle.Status = TripStatus.InUse;
            }

            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Trips trip)
        {
            // Load existing trip from DB including driver & vehicle
            var existingTrip = await _context.Trips
                .Include(t => t.AssignedDriver)
                .Include(t => t.AssignedVehicle)
                .FirstOrDefaultAsync(t => t.TripID == trip.TripID);

            if (existingTrip == null)
                throw new InvalidOperationException("Trip not found");

            // Update trip properties
            existingTrip.Source = trip.Source;
            existingTrip.Destination = trip.Destination;
            existingTrip.StartTime = trip.StartTime;
            existingTrip.EndTime = trip.EndTime;

            // Check if status is being changed to Completed
            if (existingTrip.Status != TripStatus.Completed && trip.Status == TripStatus.Completed)
            {
                // Mark driver & vehicle as Available
                if (existingTrip.AssignedDriver != null)
                    existingTrip.AssignedDriver.Status = TripStatus.Available;

                if (existingTrip.AssignedVehicle != null)
                    existingTrip.AssignedVehicle.Status = TripStatus.Available;
            }

            // Update trip status
            existingTrip.Status = trip.Status;

            _context.Trips.Update(existingTrip);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteAsync(int id)
        {
            var trip = await _context.Trips.FindAsync(id);
            if (trip != null)
            {
                _context.Trips.Remove(trip);
                await _context.SaveChangesAsync();
            }
        }
    }
}
