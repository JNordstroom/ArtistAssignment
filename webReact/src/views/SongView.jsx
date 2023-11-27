import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../utilsAndHooks/ApiService.jsx';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function SongView() {
    const { id } = useParams();
    const [songs, setSongs] = useState([]);
  
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
  
    return (
      <Container className="mt-4 mb-4">
        <h1 className="text-center mb-4">Låtar</h1>
  
        <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
          {songs.map((song) => (
            <Col key={song.id} className="d-flex">
              <Card style={{ width: '18rem' }} className="mx-auto ">
                <Card.Body
                  className="d-flex flex-column align-items-center justify-content-center "
                >
                  <Card.Title>{song.namn}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Album nummer:</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{song.placering}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }