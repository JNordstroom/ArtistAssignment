using Microsoft.EntityFrameworkCore;
using webApi.Entities;

namespace webApi.Data
{
    public class ArtistAlbumSongContext : DbContext
    {
        public ArtistAlbumSongContext(DbContextOptions<ArtistAlbumSongContext> Options): base(Options){}

        public DbSet<Artister> Artister {get; set;}
        public DbSet<Album> Album {get; set;}
        public DbSet<Låtar> Låtar {get; set;}
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Artister>()
                .HasMany(a => a.Album)
                .WithOne(a => a.Artister)
                .HasForeignKey(a => a.ArtisterId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Album>()
                .HasMany(a => a.Låtar)
                .WithOne(l => l.Album)
                .HasForeignKey(l => l.AlbumId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}