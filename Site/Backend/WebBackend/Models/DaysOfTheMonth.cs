using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebBackend.Models
{
    [Table("DaysOFTheMonth")]
    public class DaysOFTheMonth
    {
        [Key]
        public int daysID { get; set; }
        [ForeignKey("FK_teachersID")]
        public int teachersID { get; set; }

        
        public string? days { get; set; }
    }
}