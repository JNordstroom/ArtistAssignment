using Microsoft.EntityFrameworkCore;

public class ArtistAlbumSongContext : DbContext
{
    public ArtistAlbumSongContext(DbContextOptions<ArtistAlbumSongContext> Options)
        : base(Options){}

        public DbSet<artister> Artister {get; set;}
        public DbSet<album> Albums {get; set;}
        public DbSet<låtar> Låtars {get; set;}
}