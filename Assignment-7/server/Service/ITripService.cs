using Dashboard_TripMangement.Model;

namespace Dashboard_TripMangement.Service
{
    public interface ITripService
    {
        Task<IEnumerable<Trips>> GetAllAsync();
        Task<Trips?> GetByIdAsync(int id);
        Task AddAsync(Trips trip);
        Task UpdateAsync(Trips trip);
        Task DeleteAsync(int id);
    }
}
