import  { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { get } from '../utilsAndHooks/ApiService.jsx';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function SongView() {
    const { id } = useParams();
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchSongs = async () => {
        try {
          // Fetch songs for the selected album
          const songsData = await get(`låt/${id}/alla`);
          setSongs(songsData.låtar);
        } catch (error) {
          console.error('Error fetching songs:', error);
        }
      };
  
      fetchSongs();
    }, [id]);

    const goBack = () =>{
      navigate(-1);
    }
    const goToArtist = () => {
      navigate(`/`);
    };
  
    return (
      <Container className="mt-4 mb-3">
        <h1 className="text-center mb-3">Låtar</h1>
        <button onClick={goToArtist} className='btn' style={{ width: '5rem', height: '2.5rem', border: "2px outset #f8f8ff", position: 'absolute', top: "1.5rem", right: "6.2rem" }}>
        Artister
      </button>
        <button onClick={goBack} className='btn' style={{ width: '5rem', height: '2.5rem', border: "2px outset #f8f8ff", position: 'absolute', top: "1.5rem", right: "1rem" }}>
        Tillbaka
      </button>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4 justify-content-center">
          {songs.map((song) => (
            <Col key={song.id} className="d-flex">
              <Card style={{ width: '18rem', backgroundColor: "#19141c", boxShadow: '2.5px 6px rgba(0, 0, 0.0, 0.1)', border: '7px outset #f8f8ff '}} className="mx-auto ">
                <Card.Body
                  className="d-flex flex-column align-items-center justify-content-center"
                >
                  <Card.Title>{song.namn}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Album nummer:</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{song.placering}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col key="new-song" className="d-flex">
          <Link to={`/AddNewSongView/${id}`} style={{ textDecoration: 'none', width: '100%' }}>
            <Card style={{ width: '18rem', height: '7.5rem', backgroundColor: "#19141c", boxShadow: '2.5px 6px rgba(0, 0, 0.0, 0.1)', border: '7px outset #f8f8ff ' }} className="mx-auto">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title>Lägg till ny låt</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        </Row>
      </Container>
    );
  }