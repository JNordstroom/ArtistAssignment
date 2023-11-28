using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webApi.Entities;
using webApi.Data;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ArtistController : ControllerBase
    {
        private readonly ArtistAlbumSongContext _context;

        public ArtistController(ArtistAlbumSongContext context)
        {
            _context = context;
        }

        [HttpGet("alla")]
        public async Task<IActionResult> GetAllArtists()
        {
            var result = await _context.Artister
                .Select(a => new{
                    Id = a.Id,
                    Namn = a.Namn,
                    Beskrivning = a.Beskrivning
                })
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("{artistId}")]
        public async Task<IActionResult> GetArtistById(int artistId)
        {
            var result = await _context.Artister
                .Where(a => a.Id == artistId)
                .Select(a => new{
                    Id = a.Id,
                    Namn = a.Namn,
                    Beskrivning = a.Beskrivning
                })
                .ToListAsync();
            return Ok(result);
        }

        [HttpPost("createnewartist")]
        public async Task<IActionResult> CreateNewArtist(Artister newArtist)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(newArtist.Namn))
                {
                    return BadRequest("Felaktig inmatning!");
                }

                // Check if an artist with the same name already exists
                var existingArtist = await _context.Artister
                    .FirstOrDefaultAsync(a => a.Namn.ToLower() == newArtist.Namn.ToLower());

                if (existingArtist != null)
                {
                    return Conflict("Där finns redan en artist med det namnet!");
                }

                _context.Artister.Add(newArtist);
                await _context.SaveChangesAsync();
                return Ok("Artist tillagd!");
            }
            catch 
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{artistId}")]
        public async Task<IActionResult> UpdateArtist(int artistId, Artister updateArtist)
        {
            if(updateArtist == null || artistId <= 0)
            {
                return BadRequest("Felaktig inmatning!");
            }

            var existingArtist = await _context.Artister.FindAsync(artistId);

            if(existingArtist == null)
            {
                return BadRequest("Artisten finns inte!");
            }

            existingArtist.Namn = updateArtist.Namn;
            existingArtist.Beskrivning = updateArtist.Beskrivning;

            await _context.SaveChangesAsync();

            return Ok("Artisten är uppdaterad!");
        }

        [HttpDelete("{artistId}")]
        public async Task<IActionResult> DeleteArtist(int artistId)
        {
            var deleteArtist = await _context.Artister.FindAsync(artistId);

            if (deleteArtist == null)
            {
                return NotFound("Artisten finns inte!");
            }

            _context.Artister.Remove(deleteArtist);
            await _context.SaveChangesAsync();

            return Ok("Artisten och dess album och låtar är borttagna!");
        }

    }
}