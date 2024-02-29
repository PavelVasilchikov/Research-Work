using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using WebBackend.Models;

namespace WebBackend
{
    public class ApplicationDbContext:DbContext
    {
        public DbSet<InitialsTeachers> InitialsTeachers { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost;Database=TeachersDB;Trusted_Connection=True;TrustServerCertificate=true");
        }

    }
}
