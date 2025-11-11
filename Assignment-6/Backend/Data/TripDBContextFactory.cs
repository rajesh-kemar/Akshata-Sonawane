using EF_Core_TripMangement.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace EF_Core_TripMangement
{
    public class TripDbContextFactory : IDesignTimeDbContextFactory<TripDBContext>
    {
        public TripDBContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TripDBContext>();

            // Use your actual connection string here or pull from config if you prefer
            optionsBuilder.UseSqlServer("Server=DESKTOP-FFDFOM3\\SQLEXPRESS;Database=TripData;User Id=Akshata;Password=Kemar123;Encrypt=True;TrustServerCertificate=True;");

            return new TripDBContext(optionsBuilder.Options);
        }
    }
}
