using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webApi.Entities;
using webApi.Data;

namespace webApi.Controllers
{
    [Route("api/låtar")]
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
                    Namn = l.Namn,
                    Placering = l.Placering
                })
                .ToListAsync();
            return Ok(result);
        }
    }
}