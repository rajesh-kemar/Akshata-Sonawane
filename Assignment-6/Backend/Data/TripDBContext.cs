using EF_Core_TripMangement.Models;
using Microsoft.EntityFrameworkCore;

namespace EF_Core_TripMangement.Data

{
public class TripDBContext: DbContext

    {
        public TripDBContext(DbContextOptions<TripDBContext> options)
            : base(options)
        {
        }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Trip> Trips { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>()
            .Property(v => v.Capacity)
            .HasPrecision(10, 2);

            modelBuilder.Entity<Vehicle>()
                .Property(v => v.Status)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Trip>()
                .HasOne(t => t.AssignedDriver)
                .WithMany(d => d.Trips)
                .HasForeignKey(t => t.AssignedDriverId);

            modelBuilder.Entity<Trip>()
                .HasOne(t => t.AssignedVehicle)
                .WithMany(v => v.Trips)
                .HasForeignKey(t => t.AssignedVehicleId);

            modelBuilder.Entity<Trip>()
               .Property(t => t.Status)
               .HasConversion<string>(); // Stores enum as string in DB
        }



    }
}
