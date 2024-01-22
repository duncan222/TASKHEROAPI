using System.ComponentModel.DataAnnotations;

namespace TaskHeroAPI
{
    //model for the users individual friends... associates with UserID. 
    public class UserFriends
    {
        [Key] public int UserId { get; set; }

        public string[] BlockedUserID {  get; set; } = Array.Empty<string>();

        public string[] FreindsUserID { get; set; } = Array.Empty<string>();

    }
}
