﻿using System;
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
    public class AchievementsController : ControllerBase
    {
        private readonly DataContext _context;

        public AchievementsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Achievements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Achievements>>> GetAchievemts()
        {
            return await _context.Achievements.ToListAsync();
        }

        // GET: api/Achievements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Achievements>> GetAchievements(int id)
        {
            var achievements = await _context.Achievements.FindAsync(id);

            if (achievements == null)
            {
                return NotFound();
            }

            return achievements;
        }

        // PUT: api/Achievements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAchievements(int id, Achievements achievements)
        {
            if (id != achievements.Id)
            {
                return BadRequest();
            }

            _context.Entry(achievements).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AchievementsExists(id))
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

        // POST: api/Achievements
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Achievements>> PostAchievements(Achievements achievements)
        {
            _context.Achievements.Add(achievements);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAchievements", new { id = achievements.Id }, achievements);
        }

        // DELETE: api/Achievements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAchievements(int id)
        {
            var achievements = await _context.Achievements.FindAsync(id);
            if (achievements == null)
            {
                return NotFound();
            }

            _context.Achievements.Remove(achievements);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AchievementsExists(int id)
        {
            return _context.Achievements.Any(e => e.Id == id);
        }
    }
}
