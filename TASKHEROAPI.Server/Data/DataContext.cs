using Microsoft.EntityFrameworkCore;

//references to the models for the database context. 

namespace TaskHeroAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<UsersAccounts> UsersAccounts { get; set; }
    
        public DbSet<UserAchievements> UserAchievements { get; set;}

        public DbSet<UserFriends> UserFriends { get; set; }

        public DbSet<UserSettings> UserSettings { get; set; }

        public DbSet<Achievements> Achievemts { get; set; } 

        public DbSet<UserTasks> UserTasks { get; set; }
    
    }
}
