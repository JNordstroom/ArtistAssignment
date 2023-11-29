using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using webApi.Data;

public class CacheService : IHostedService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IMemoryCache _cache;
    private ArtistAlbumSongContext _context;

    public CacheService(IServiceScopeFactory scopeFactory, IMemoryCache cache)
    {
        _scopeFactory = scopeFactory;
        _cache = cache;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = _scopeFactory.CreateScope();
        _context = scope.ServiceProvider.GetRequiredService<ArtistAlbumSongContext>();

         // Fetch data from the artist table
        var artists = await _context.Artister
            .Select(a => new
            {
                Id = a.Id,
                Namn = a.Namn,
                Beskrivning = a.Beskrivning
            })
            .ToListAsync();

        // Store in cache
        _cache.Set("AllArtists", artists, new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
        });

        // Fetch data from the album table
        var albums = await _context.Album
            .Select(a => new
            {
                Id = a.Id,
                Namn = a.Namn,
                Publicerad = a.Publicerad
            })
            .ToListAsync();

        // Store in cache
        _cache.Set("AllAlbums", albums, new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
        });

        // Fetch data from the song table
        var songs = await _context.Låtar
            .Select(a => new
            {
                Id = a.Id,
                Namn = a.Namn,
                Placering = a.Placering
            })
            .ToListAsync();

        // Store in cache
        _cache.Set("AllSongs", songs, new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
        });
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        // Cleanup 
        return Task.CompletedTask;
    }
}