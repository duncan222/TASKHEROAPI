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
    public class UserFriendsController : ControllerBase
    {
        private readonly DataContext _context;

        public UserFriendsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/UserFriends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserFriends>>> GetUserFriends()
        {
            return await _context.UserFriends.ToListAsync();
        }

        // GET: api/UserFriends/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserFriends>> GetUserFriends(int id)
        {
            var userFriends = await _context.UserFriends.FindAsync(id);

            if (userFriends == null)
            {
                return NotFound();
            }

            return userFriends;
        }

        // PUT: api/UserFriends/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserFriends(int id, UserFriends userFriends)
        {
            if (id != userFriends.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userFriends).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserFriendsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserFriends
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserFriends>> PostUserFriends(UserFriends userFriends)
        {
            _context.UserFriends.Add(userFriends);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserFriendsExists(userFriends.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserFriends", new { id = userFriends.UserId }, userFriends);
        }

        // DELETE: api/UserFriends/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserFriends(int id)
        {
            var userFriends = await _context.UserFriends.FindAsync(id);
            if (userFriends == null)
            {
                return NotFound();
            }

            _context.UserFriends.Remove(userFriends);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserFriendsExists(int id)
        {
            return _context.UserFriends.Any(e => e.UserId == id);
        }
    }
}
