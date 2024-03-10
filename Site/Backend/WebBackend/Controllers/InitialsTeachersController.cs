using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBackend.Models;
using Microsoft.IdentityModel.Tokens;

namespace WebBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InitialsTeachersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InitialsTeachersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/InitialsTeachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InitialsTeachers>>> GetInitialsTeachers()
        {
            return await _context.InitialsTeachers.ToListAsync();
        }

        // GET: api/InitialsTeachers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InitialsTeachers>> GetInitialsTeachers(int id)
        {
            var initialsTeachers = await _context.InitialsTeachers.FindAsync(id);

            if (initialsTeachers == null)
            {
                return NotFound();
            }

            return initialsTeachers;
        }

        // POST: api/InitialsTeachers
        [HttpPost]
        public async Task<ActionResult<InitialsTeachers>> PostInitialsTeachers(InitialsTeachers initialsTeachers)
        {
            _context.InitialsTeachers.Add(initialsTeachers);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInitialsTeachers", new { id = initialsTeachers.Id }, initialsTeachers);
        }

        // PUT: api/InitialsTeachers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInitialsTeachers(int id, InitialsTeachers initialsTeachers)
        {
            if (id != initialsTeachers.Id)
            {
                return BadRequest();
            }

            _context.Entry(initialsTeachers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InitialsTeachersExists(id))
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

        // DELETE: api/InitialsTeachers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInitialsTeachers(int id)
        {
            var initialsTeachers = await _context.InitialsTeachers.FindAsync(id);

            if (initialsTeachers == null)
            {
                return NotFound();
            }

            _context.InitialsTeachers.Remove(initialsTeachers);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InitialsTeachersExists(int id)
        {
            return _context.InitialsTeachers.Any(e => e.Id == id);
        }
    }
}