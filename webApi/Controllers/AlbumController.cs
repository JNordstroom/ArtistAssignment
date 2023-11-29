using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using webApi.Entities;
using webApi.Data;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly ArtistAlbumSongContext _context;

        public AlbumController(ArtistAlbumSongContext context)
        {
            _context = context;
        }

        [HttpGet("alla")]
        public async Task<IActionResult> GetAllAlbums()
        {
             var result = await _context.Album
                .Select(a => new{
                    Id = a.Id,
                    Namn = a.Namn,
                    Publicerad = a.Publicerad
                })
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("{albumId}")]
        public async Task<IActionResult> GetAlbumById(int albumId)
        {
             var result = await _context.Album
                .Where(a => a.Id == albumId)
                .Select(a => new{
                    Id = a.Id,
                    Namn = a.Namn,
                    Publicerad = a.Publicerad
                })
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("artist/{artisterId}")] 
        public async Task<IActionResult> GetAllAlbumsFromOneArtist(int artisterId)
        {
            var result = await _context.Artister
                .Where(a => a.Id == artisterId)
                .Select(a => new
                {
                    
                    ArtistNamn = a.Namn,
                    ArtistBeskrivning = a.Beskrivning,
                    Album = a.Album.Select(b => new
                    {
                        Id = b.Id,
                        Namn = b.Namn,
                        Publicerad = b.Publicerad
                    })
                    .ToList()
                })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }


       [HttpPost("createnewalbum")]
        public async Task<IActionResult> CreateNewAlbum(Album newAlbum)
        {
            try
            {
                //check to make sure there is an album on that id
                if (newAlbum == null || newAlbum.ArtisterId <= 0)
                {
                    return BadRequest("Felaktig inmatning!");
                }

                // Check for whitespace in album name
                if (string.IsNullOrWhiteSpace(newAlbum.Namn))
                {
                    return BadRequest("Album name cannot be empty or contain only whitespace.");
                }

                // Check if the album name already exsist
                var existingAlbum = await _context.Album
                    .FirstOrDefaultAsync(a => a.Namn.ToLower() == newAlbum.Namn.ToLower() && a.ArtisterId == newAlbum.ArtisterId);

                if (existingAlbum != null)
                {
                    return Conflict("Ett album med det namnet finns redan!");
                }

                _context.Album.Add(newAlbum);
                await _context.SaveChangesAsync();

                return Ok("Album tillagd!");
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPut("{albumId}")]
        public async Task<IActionResult> UpdateAlbum (int albumId, Album updateAlbum)
        {
            if(updateAlbum == null || albumId <= 0)
            {
                return BadRequest("Felaktig inmatning!");
            }

            var exsistingAlbum = await _context.Album.FindAsync(albumId);

            if(exsistingAlbum == null)
            {
                return BadRequest("Albumet finns inte!");
            }

            exsistingAlbum.Namn = updateAlbum.Namn;
            exsistingAlbum.Publicerad = updateAlbum.Publicerad;

            await _context.SaveChangesAsync();

            return Ok("Albumet är uppdaterad!");
        }

        [HttpDelete("{albumId}")]
        public async Task<IActionResult> DeleteAlbum(int albumId)
        {
            var deleteAlbum = await _context.Album.FindAsync(albumId);

            if (deleteAlbum == null)
            {
                return NotFound("Albumet finns inte!");
            }

            _context.Album.Remove(deleteAlbum);
            await _context.SaveChangesAsync();

            return Ok("Albumet och dess låtar är borttagna!");
        }
    }
}