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

    public CacheService(IServiceScopeFactory scopeFactory, IMemoryCache cache)
    {
        _scopeFactory = scopeFactory;
        _cache = cache;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = _scopeFactory.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ArtistAlbumSongContext>();

        // Fetch data from the album table
        var albums = await context.Album
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
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        // Cleanup 
        return Task.CompletedTask;
    }
}