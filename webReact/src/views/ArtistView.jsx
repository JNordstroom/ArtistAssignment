import { useState, useEffect } from 'react';
import { get } from '../utilsAndHooks/ApiService.jsx'; 
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    <Container className="mt-4">
      <h1 className="text-center mb-4">Artists</h1>
      <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
        {artists.map((artist) => (
          <Col key={artist.id} className="d-flex">
            <Link to={`/Album/${artist.id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Card style={{ width: '18rem' }} className="mx-auto">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <Card.Title>{artist.namn}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Beskrivning</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8rem' }}>{artist.beskrivning}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}