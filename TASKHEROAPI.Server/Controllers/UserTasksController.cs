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
    public class UserTasksController : ControllerBase
    {
        private readonly DataContext _context;

        public UserTasksController(DataContext context)
        {
            _context = context;
        }

        // GET: api/UserTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserTasks>>> GetUserTasks()
        {
            return await _context.UserTasks.ToListAsync();
        }

        // GET: api/UserTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserTasks>> GetUserTasks(int id)
        {
            var userTasks = await _context.UserTasks.FindAsync(id);

            if (userTasks == null)
            {
                return NotFound();
            }

            return userTasks;
        }

        // PUT: api/UserTasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserTasks(int id, UserTasks userTasks)
        {
            if (id != userTasks.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userTasks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTasksExists(id))
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

        // POST: api/UserTasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserTasks>> PostUserTasks(UserTasks userTasks)
        {
            _context.UserTasks.Add(userTasks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserTasks", new { id = userTasks.UserId }, userTasks);
        }

        // DELETE: api/UserTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserTasks(int id)
        {
            var userTasks = await _context.UserTasks.FindAsync(id);
            if (userTasks == null)
            {
                return NotFound();
            }

            _context.UserTasks.Remove(userTasks);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserTasksExists(int id)
        {
            return _context.UserTasks.Any(e => e.UserId == id);
        }
    }
}
