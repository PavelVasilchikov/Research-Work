using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using WebBackend.Models;

namespace WebBackend
{
    public class ApplicationDbContext:DbContext
    {
        public DbSet<InitialsTeachers> InitialsTeachers { get; set; }
        public DbSet<DaysOFTheMonth> DaysOFTheMonth { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server=127.0.0.1,1433;Database=TeachersDB;User Id=sa;Password=YourNewPassword123;TrustServerCertificate=true;");
            optionsBuilder.UseSqlServer("Server=host.docker.internal,1433;Database=TeachersDB;User Id=sa;Password=YourNewPassword123;TrustServerCertificate=true;");

        }

    }
}
