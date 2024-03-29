using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskHeroAPI;
using TaskHeroAPI.Data;

namespace TASKHEROAPI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFollowsController : ControllerBase
    {
        private readonly DataContext _context;

        public UserFollowsController(DataContext context)
        {
            _context = context;
        }

        // POST: api/UserFollows
        [HttpPost]
        public async Task<ActionResult> AddFollower(int idToFollow, int currentUserId)
        {
            // Check if the follower and following users exist
            var follower = await _context.Users.FindAsync(idToFollow);
            var following = await _context.Users.FindAsync(currentUserId);

            if (follower == null || following == null)
            {
                return NotFound("One or both users not found.");
            }

            // Check if the relationship already exists
            var existingFollow = await _context.UserFollows
                .FirstOrDefaultAsync(uf => uf.FollowerId == idToFollow && uf.FollowingId == currentUserId);

            if (existingFollow != null)
            {
                return Conflict("User is already following this user.");
            }

            // Create a new follower relationship
            var userFollows = new UserFollows
            {
                FollowerId = idToFollow,
                FollowingId = currentUserId
            };

            _context.UserFollows.Add(userFollows);
            await _context.SaveChangesAsync();

            return Ok(userFollows);
        }

        // POST: api/UserFollows/Unfollow
        [HttpPost("Unfollow")]
        public async Task<ActionResult> UnfollowUser(int currentUserId, int idToUnfollow)
        {
            // Find the user being followed
            var followedUser = await _context.Users.FindAsync(currentUserId);
            if (followedUser == null)
            {
                return NotFound("User to unfollow not found.");
            }

            // Find the follower
            var follower = await _context.Users.FindAsync(idToUnfollow);
            if (follower == null)
            {
                return NotFound("Follower not found.");
            }

            // Check if the relationship exists
            var existingFollow = await _context.UserFollows
                .FirstOrDefaultAsync(uf => uf.FollowerId == idToUnfollow && uf.FollowingId == currentUserId);

            if (existingFollow == null)
            {
                return Conflict("User is not currently following this user.");
            }

            // Remove the follower relationship
            _context.UserFollows.Remove(existingFollow);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User unfollowed successfully" });
        }

        // GET: api/UserFollows/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserFollows>> GetFollower(int id)
        {
            var userFollows = await _context.UserFollows.FindAsync(id);

            if (userFollows == null)
            {
                return NotFound();
            }

            return userFollows;
        }
    }
}
