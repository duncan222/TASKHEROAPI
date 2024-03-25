using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskHeroAPI
{
    public class UserFollows
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Followers")]
        public int FollowerId { get; set; }
        public User? Follower { get; set; }

        [ForeignKey("Following")]
        public int FollowingId { get; set; }
        public User? Following { get; set; }
    }
}
