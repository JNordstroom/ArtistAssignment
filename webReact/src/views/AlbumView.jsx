import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { get } from '../utilsAndHooks/ApiService.jsx';
import { Container, Row, Col, Card  } from 'react-bootstrap';

export default function AlbumView() {
  const { id } = useParams();
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

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

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-3">Albums</h1>
        <h2 className="text-center mb-3">Artist: {artist.artistNamn}</h2>
        <button onClick={goBack} className='btn' style={{ width: '5rem', height: '2.5rem', border: "2px outset #f8f8ff", position: 'absolute', top: "1.5rem", right: "1rem" }}>
        Tillbaka
      </button>
      <Row className="g-4 justify-content-center">
      
        {albums.map((album) => (
          <Col key={album.id} className="d-flex">
            <Link to={`/Songs/${album.id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Card style={{ width: '18rem', backgroundColor: "#19141c", boxShadow: '2.5px 6px rgba(0, 0, 0.0, 0.1)', border: '7px outset #f8f8ff '}} className="mx-auto">
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

        <Col key="new-album" className="d-flex">
          <Link to={`/CreateNewAlbumView/${id}`} style={{ textDecoration: 'none', width: '100%' }}>
            <Card style={{ width: '18rem', height: '7.5rem', backgroundColor: "#19141c", boxShadow: '2.5px 6px rgba(0, 0, 0.0, 0.1)', border: '7px outset #f8f8ff ' }} className="mx-auto">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title>Lägg till nytt album</Card.Title>
                
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}