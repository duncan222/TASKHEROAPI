using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskHeroAPI;
using TaskHeroAPI.Data;
using System.Web.Http.Cors;

namespace TASKHEROAPI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
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
        [HttpGet("{UserId}")]
        public async Task<ActionResult<UserTasks>> GetUserTasks(int UserId)
        {
            var userTasks = await _context.UserTasks
                .Where(ut => ut.UserId == UserId)
                .ToListAsync();
            return Ok(userTasks);
        }

        // PUT: api/UserTasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{TaskId}")]
        public async Task<IActionResult> PutUserTasks(int TaskId, UserTasks userTasks)
        {
            if (TaskId != userTasks.TaskId)
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
                if (!UserTasksExists(TaskId))
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
        public async Task<ActionResult<UserTasks>> PostUserTasks(int UserId, UserTasks userTasks)
        {
            userTasks.UserId = UserId;
            _context.UserTasks.Add(userTasks);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserTasks", new { TaskId = userTasks.TaskId }, userTasks);
        }

        // DELETE: api/UserTasks/5
        [HttpDelete("{TaskId}")]
        public async Task<IActionResult> DeleteUserTasks(int TaskId)
        {
            var userTasks = await _context.UserTasks.FindAsync(TaskId);
            if (userTasks == null)
            {
                return NotFound();
            }

            _context.UserTasks.Remove(userTasks);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserTasksExists(int TaskId)
        {
            return _context.UserTasks.Any(e => e.TaskId == TaskId);
        }
    }
}
