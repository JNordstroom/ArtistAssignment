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

    public class LåtController : ControllerBase
    {
        private readonly ArtistAlbumSongContext _context;

        public LåtController(ArtistAlbumSongContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSongs()
        {
            var result = await _context.Låtar
                .Select(l => new {
                    Id = l.Id,
                    Namn = l.Namn,
                    Placering = l.Placering,
                    AlbumId = l.AlbumId
                })
                .ToListAsync();
            return Ok(result);
        }
        [HttpGet("{songId}")]
        public async Task<IActionResult> GetSingelSongById(int songId)
        {
            var result = await _context.Låtar
                .Where(l => l.Id == songId)
                .Select(l => new {
                    Namn = l.Namn,
                    Placering = l.Placering
                })
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("{albumId}/{songId}")]
        public async Task<IActionResult> GetSongFromSpecificAlbumById(int albumId, int songId)
        {
            var result = await _context.Album
                .Where(a => a.Id == albumId)
                .Select(a => new{
                    Namn = a.Namn,
                    Låtar = a.Låtar
                    .Where(l => l.Id == songId)
                    .Select(l => new{
                        Namn = l.Namn,
                        Placering = l.Placering
                    })
                    .ToList()
                })
                .ToListAsync();
            return Ok(result);
        }
        


        [HttpGet("{albumId}/alla")]
        public async Task<IActionResult> GetAllSongFromSpecificAlbum(int albumId)
        {
            var result = await _context.Album
                .Where(a => a.Id == albumId)
                .Select(a => new {
                    Namn = a.Namn,
                    Låtar = a.Låtar.Select(l => new{
                        Id = l.Id,
                        Namn = l.Namn,
                        Placering = l.Placering
                    })
                    .ToList()
                })
                .FirstOrDefaultAsync();
            return Ok(result);
        }

        [HttpPost("addnewsong")]
        public async Task<IActionResult> CreateNewSong(Låtar newSong)
        {
            try{
                if(newSong == null || newSong.AlbumId <= 0)
            {
                return BadRequest("Felaktig inmatning!");
            }
            if (string.IsNullOrWhiteSpace(newSong.Namn))
            {
                return BadRequest("Låtnamnet kan inte vara tomt!.");
            }
            var existingSong = await _context.Låtar
                .FirstOrDefaultAsync(a => a.Namn.ToLower() == newSong.Namn.ToLower() && a.AlbumId == newSong.AlbumId);

            if (existingSong != null)
            {
                return Conflict("En låt med det namnet finns redan!");
            }


            _context.Låtar.Add(newSong);
            await _context.SaveChangesAsync();

            return Ok("Låt tillagd!");
            }
            catch{
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{songId}")]
        public async Task<IActionResult> UpdateAlbum (int songId, Låtar updateSong)
        {
            if(updateSong == null || songId <= 0)
            {
                return BadRequest("Felaktig inmatning!");
            }

            var exsistingSongs = await _context.Låtar.FindAsync(songId);

            if(exsistingSongs == null)
            {
                return BadRequest("Låten finns inte!");
            }

            exsistingSongs.Namn = updateSong.Namn;
            exsistingSongs.Placering = updateSong.Placering;

            await _context.SaveChangesAsync();

            return Ok("Låten är uppdaterad!");
        }

        [HttpDelete("{songId}")]
        public async Task<IActionResult> DeleteSong(int songId)
        {
            var deleteSong = await _context.Låtar.FindAsync(songId);

            if (deleteSong == null)
            {
                return NotFound("Låten finns inte!");
            }

            _context.Låtar.Remove(deleteSong);
            await _context.SaveChangesAsync();

            return Ok("Låten är borttagna!");
        }
    }
}