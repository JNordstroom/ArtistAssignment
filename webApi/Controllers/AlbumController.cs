using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using webApi.Entities;
using webApi.Data;

namespace webApi.Controllers
{
    [Route("api/album")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly ArtistAlbumSongContext _context;

        public AlbumController(ArtistAlbumSongContext context)
        {
            _context = context;
        }

        [HttpGet]
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


        [HttpPost]
        public async Task<IActionResult> CreateNewAlbum (Album newAlbum)
        {
            if(newAlbum == null || newAlbum.ArtisterId <= 0)
            {
                return BadRequest("Felaktig inmatning!");
            }

            _context.Album.Add(newAlbum);
            await _context.SaveChangesAsync();

            return Ok("Album tillagd!");
        }
    }
}