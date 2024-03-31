using System.ComponentModel.DataAnnotations;

namespace TaskHeroAPI
{
    //model for the users individual achievments... associates with userID. 
    public class UserAchievements
    {
        [Key] public int UserId { get; set; }

        //the users badge (level)
        public int BadgeID {  get; set; } 

        public int weeklyProgress { get; set; }

        public int dailyTracker { get; set; }

        public int totalScore { get; set; }

        //this will be a time stamp 
        [StringLength(20)] public string lastActive { get; set; } = string.Empty;

        public string[] UnlockedAchievements { get; set;} = Array.Empty<string>();

        public string[] LockedAchievements { get; set; } = Array.Empty<string>();

        public int weeklytasks { get; set; }

        public int tasksCompleted { get; set; }

    }
}
