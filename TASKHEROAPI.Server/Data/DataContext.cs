using Microsoft.EntityFrameworkCore;

//references to the models for the database context. 

namespace TaskHeroAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("dbo");

            modelBuilder.Entity<User>()
                .HasMany(u => u.Followers)
                .WithMany(u => u.Following)
                .UsingEntity<UserFollows>(
                    j => j
                        .HasOne(uf => uf.Following)
                        .WithMany()
                        .HasForeignKey(uf => uf.FollowingId),
                    j => j
                        .HasOne(uf => uf.Follower)
                        .WithMany()
                        .HasForeignKey(uf => uf.FollowerId),
                    j =>
                    {
                        j.ToTable("UserFollows");
                        j.HasKey(uf => uf.Id);
                    });
        }

        public DbSet<User> Users { get; set; }

        public DbSet<UsersAccounts> UsersAccounts { get; set; }
    
        public DbSet<UserAchievements> UserAchievements { get; set;}

        public DbSet<UserFollows> UserFollows { get; set; }

        public DbSet<UserSettings> UserSettings { get; set; }

        public DbSet<Achievements> Achievements { get; set; } 

        public DbSet<UserTasks> UserTasks { get; set; }
    
    }
}
