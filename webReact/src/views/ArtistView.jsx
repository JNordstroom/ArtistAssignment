import { useState, useEffect } from 'react';
import { get } from '../utilsAndHooks/ApiService.jsx'; // Make sure to import your get function

export default function ArtistView() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const artistData = await get('Artist/alla');
        console.log(artistData);
        setArtists(artistData);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <strong>{artist.namn}</strong>: {artist.beskrivning}
          </li>
          
        ))}
      </ul>
    </div>
  );
}