using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.ComponentModel.DataAnnotations;

namespace TaskHeroAPI
{

    //model for the users individual settings. associates with userID. 
    public class UserSettings
    {
        [Key] public int UserId { get; set; }

        public bool Discoverability { get; set; }

            // friends, no one, everyone. ( 1, 2, or 3) 
        public int ScorePrivacyID { get; set; }
        public int FeedPrivacyID { get; set; }

        public int ThemeId { get; set; }
        public int AvatarId { get; set; }


    }
}
