using System.ComponentModel.DataAnnotations;

namespace TaskHeroAPI
{
    public class User
    {
        [Key] public int UserId { get; set; }

        public int Score { get; set; }

        [StringLength(20)]
        public string UserName { get; set; } = string.Empty;

        [StringLength(40)]
        public string Image { get; set; } = string.Empty;

        public UserSettings? UserSettings { get; set; }

        public UsersAccounts? UserAccount { get; set; }

        public UserFriends? Friends { get; set; }

        public UserAchievements? Achievements { get; set; }

        public ICollection<UserTasks>? Tasks { get; set; }
    }
}
