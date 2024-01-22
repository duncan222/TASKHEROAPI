using System.ComponentModel.DataAnnotations;

namespace TaskHeroAPI
{
    //model for the users individual achievments... associates with userID. 
    public class UserAchievements
    {
        [Key] public int UserId { get; set; }
        public int BadgeID {  get; set; } 

        public string[] UnlockedAchievements { get; set;} = Array.Empty<string>();

        public string[] LockedAchievements { get; set; } = Array.Empty<string>();

    }
}
