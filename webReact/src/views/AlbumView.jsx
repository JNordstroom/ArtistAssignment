import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { get } from '../utilsAndHooks/ApiService.jsx';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function AlbumView() {
  const { id } = useParams();
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch artist data
        const artistData = await get(`Album/artist/${id}`);
        setArtist(artistData);

        // Fetch albums for the artist
        const albumsData = await get(`Album/artist/${id}`);
        setAlbums(albumsData.album);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Albums</h1>
      <h2 className="text-center mb-4">{artist.artistNamn}</h2>

      <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
        {albums.map((album) => (
          <Col key={album.id} className="d-flex">
            <Link to={`/Songs/${album.id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Card style={{ width: '18rem' }} className="mx-auto">
                <Card.Body
                  className="d-flex flex-column align-items-center justify-content-center"
                >
                  <Card.Title>{album.namn}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Publicerad</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8rem' }}>
                    {album.publicerad}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}