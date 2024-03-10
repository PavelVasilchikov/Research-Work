using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebBackend.Models
{
    [Table("InitialsTeachers")]
    public class InitialsTeachers
    {
        [Key]
        public int? Id { get; set; }
        [Required]
        public int Registration_number { get; set; }

        [Required]
        public string Initials { get; set; }
    }
}
