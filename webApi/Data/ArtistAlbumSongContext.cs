using Microsoft.EntityFrameworkCore;

namespace webApi.Data
{
    public class ArtistAlbumSongContext : DbContext
{
    public ArtistAlbumSongContext(DbContextOptions<ArtistAlbumSongContext> Options)
        : base(Options){}

        public DbSet<Artister> Artister {get; set;}
        public DbSet<Album> Albums {get; set;}
        public DbSet<Låtar> Låtar {get; set;}
}
}