using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskHeroAPI
{
    public class UserTasks
    {
        [Key] public int TaskId { get; set; }
        [ForeignKey("User")] public int UserId { get; set; } 

        [StringLength(100)]
        public string Descripcion { get; set; } = string.Empty;

        [StringLength(20)]
        public string TimeStamp { get; set; } = string.Empty;

        [StringLength(20)]
        public string Title { get; set; } = string.Empty; 

        [StringLength(20)]
        public string DueDate { get; set; } = string.Empty;

        public int Importance { get; set; } 

        public int Weight { get; set; }

        //changes within certain frames before duedate
        public int Urgency { get; set; }

    }
}
