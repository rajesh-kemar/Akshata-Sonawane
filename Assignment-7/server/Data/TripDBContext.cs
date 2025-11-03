using Dashboard_TripMangement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Dashboard_TripMangement.Data
{
    public class TripDBContext: DbContext
    {
        public TripDBContext(DbContextOptions<TripDBContext> options): base(options)
        {
            
        }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Trips> Trips { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>()
            .Property(v => v.Capacity)
            .HasPrecision(10, 2);

            modelBuilder.Entity<Vehicle>()
                .Property(v => v.Status)
                .HasConversion<string>();

            modelBuilder.Entity<Driver>()
           .Property(d => d.Status)
           .HasConversion<string>(); // 🔹 Store enum as string in DB


            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Trips>()
                .HasOne(t => t.AssignedDriver)
                .WithMany(d => d.Trips)
                .HasForeignKey(t => t.AssignedDriverId);

            modelBuilder.Entity<Trips>()
                .HasOne(t => t.AssignedVehicle)
                .WithMany(v => v.Trips)
                .HasForeignKey(t => t.AssignedVehicleId);

            modelBuilder.Entity<Trips>()
               .Property(t => t.Status)
               .HasConversion<string>(); // Stores enum as string in DB
        }
    }
}
