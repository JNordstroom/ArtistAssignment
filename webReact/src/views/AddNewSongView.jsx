import { useState } from 'react';
import { post } from '../utilsAndHooks/ApiService';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row } from 'react-bootstrap';

const CreateNewAlbumView = () => {
  const [formData, setFormData] = useState({ Namn: '', Placering: null, AlbumId: null });
  const navigate = useNavigate();
  const { id: albumId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await post('låt/addnewsong', {
        ...formData,
        Namn: formData.Namn,
        // Parsing the user input
        Placering: parseInt(formData.Placering, 10),
        AlbumId: parseInt(albumId, 10),
      });

      if (response.error) {
        console.error('Fel vid försök att lägga till låten:', response.error);
      } else {
        alert('Låten tillagd!');
        // route back to that the songpage
        navigate(`/Songs/${albumId}`);
      }
    } catch (error) {
      console.error('Fel vid försök att skapa låt:', error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ width: "90%", maxWidth: "800px", minHeight: "100vh", fontSize: "1.2rem"}}>
      <Row>
      <h1 className='d-flex justify-content-center mb-4'>Lägg till ny låt</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Namn">
            <Form.Label>Namn</Form.Label>
            <Form.Control
              type="text"
              name="Namn"
              value={formData.Namn}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="Placering">
            <Form.Label>Placering</Form.Label>
            <Form.Control
              as="textarea"
              name="Placering"
              value={formData.Placering}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Button type="submit" variant="primary" style={{ marginRight: '0.5rem' }}>
            Lägg till låten
          </Button>
          <Button variant="secondary" onClick={goBack}>
            Tillbaka
          </Button>
        </Form>
      </Row>
      
    </Container>
  );
  
};

export default CreateNewAlbumView;