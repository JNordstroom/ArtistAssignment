import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../utilsAndHooks/ApiService.jsx';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function AlbumView() {
  const { id } = useParams();
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumData = await get(`Album/artist/${id}`);
        console.log('API Response:', albumData);
        setAlbums(albumData.album);
        setArtist(albumData); // Set the artist state with the API response
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbums();
  }, [id]);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-2">Albums of</h1>
      <h4 className="text-center mb-4">{artist.artistNamn}</h4>
      <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
        {albums.map((album) => (
          <Col key={album.id} className="d-flex">
            <Card style={{ width: '18rem' }} className="mx-auto">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title>{album.namn}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Publicerad</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8rem' }}>{album.publicerad}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}