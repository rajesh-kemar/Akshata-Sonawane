using Dashboard_TripMangement.Model;

namespace Dashboard_TripMangement.Service
{
    public interface IDriverService
    {
        Task<IEnumerable<Driver>> GetAllAsync();
        Task<Driver?> GetByIdAsync(int id);
        Task AddAsync(Driver driver);
        Task UpdateAsync(Driver driver);
        Task DeleteAsync(int id);

    }
}
