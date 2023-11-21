using Microsoft.EntityFrameworkCore;
using webApi.Entities;

namespace webApi.Data
{
    public class ArtistAlbumSongContext : DbContext
{
    public ArtistAlbumSongContext(DbContextOptions<ArtistAlbumSongContext> Options)
        : base(Options){}

        public DbSet<Artister> artister {get; set;}
        public DbSet<Album> album {get; set;}
        public DbSet<Låtar> låtar {get; set;}
}
}