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
    public class UserAchievementsController : ControllerBase
    {
        private readonly DataContext _context;

        public UserAchievementsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/UserAchievements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAchievements>>> GetUserAchievements()
        {
            return await _context.UserAchievements.ToListAsync();
        }

        // GET: api/UserAchievements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAchievements>> GetUserAchievements(int id)
        {
            var userAchievements = await _context.UserAchievements.FindAsync(id);

            if (userAchievements == null)
            {
                return NotFound();
            }

            return userAchievements;
        }

        // PUT: api/UserAchievements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAchievements(int id, UserAchievements userAchievements)
        {
            if (id != userAchievements.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userAchievements).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAchievementsExists(id))
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

        // POST: api/UserAchievements
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserAchievements>> PostUserAchievements(UserAchievements userAchievements)
        {
            _context.UserAchievements.Add(userAchievements);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserAchievementsExists(userAchievements.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserAchievements", new { id = userAchievements.UserId }, userAchievements);
        }


        // DELETE: api/UserAchievements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAchievements(int id)
        {
            var userAchievements = await _context.UserAchievements.FindAsync(id);
            if (userAchievements == null)
            {
                return NotFound();
            }

            _context.UserAchievements.Remove(userAchievements);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserAchievementsExists(int id)
        {
            return _context.UserAchievements.Any(e => e.UserId == id);
        }
    }
}
