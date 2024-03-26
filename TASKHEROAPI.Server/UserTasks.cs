using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskHeroAPI
{
    public class UserTasks
    {
        [Key] public int TaskId { get; set; }
        [ForeignKey("User")] public int UserId { get; set; } 

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [StringLength(100)]
        public string TimeStamp { get; set; } = string.Empty;

        [StringLength(50)]
        public string Title { get; set; } = string.Empty; 

        [StringLength(100)]
        public string DueDate { get; set; } = string.Empty;

        public int Importance { get; set; } 

        public double Weight { get; set; }

        //changes within certain frames before duedate
        public double Urgency { get; set; }

    }
}
