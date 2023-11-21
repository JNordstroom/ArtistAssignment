using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webApi.Entities;
using webApi.Data;

namespace webApi.Controllers
{
    [Route("api/artister")]
    [ApiController]

    public class ArtistController : ControllerBase
    {
        private readonly ArtistAlbumSongContext _context;

        public ArtistController(ArtistAlbumSongContext context)
        {
            _context = context;
        }

        [HttpGet]
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
    }
}