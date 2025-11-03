using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using static System.Net.Mime.MediaTypeNames;

namespace Dashboard_TripMangement.Data
{
    public class TripDbContextFactory : IDesignTimeDbContextFactory<TripDBContext>
    {
        public TripDBContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TripDBContext>();

            // Use your actual connection string here or pull from config if you prefer
            optionsBuilder.UseSqlServer("Server=DESKTOP-FFDFOM3\\SQLEXPRESS;Database=TripdetailDb;User Id=Akshata;Password=Kemar123;Encrypt=True;TrustServerCertificate=True;");


            return new TripDBContext(optionsBuilder.Options);
        }
    }
}