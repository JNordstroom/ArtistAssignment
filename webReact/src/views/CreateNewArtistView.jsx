import { useState } from 'react';
import { post } from '../utilsAndHooks/ApiService'; 
import { useNavigate } from 'react-router-dom';
import { Container, Row, Button, Form } from 'react-bootstrap';

const CreateNewArtistView = () => {
  const [formData, setFormData] = useState({ artistNamn: '', artistBeskrivning: '' });
  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await post('artist/createnewartist', {
        Namn: formData.artistNamn,
        Beskrivning: formData.artistBeskrivning
      });

      if (response.error) {
        console.log("Fel vid försök att lägga till artisten:", response.error);
      } else {
        alert('Artist tillagd!');
        // Redirect to the artist page
        navigate('/'); 
      }
    } catch (error) {
      console.error('Fel uppstod när du försökte skapa artist!:', error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ width: "90%", maxWidth: "800px", minHeight: "100vh", fontSize: "1.2rem" }}>
    <Row>
    <h1 className='d-flex justify-content-center mb-4'>Lägg till ny artist</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="artistNamn">
          <Form.Label>Namn</Form.Label>
          <Form.Control
            type="text"
            name="artistNamn"
            value={formData.artistNamn}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="artistBeskrivning">
          <Form.Label>Beskrivning</Form.Label>
          <Form.Control
            as="textarea"
            name="artistBeskrivning"
            value={formData.artistBeskrivning}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" style={{ marginRight: '0.5rem' }}>
          Lägg till artisten
        </Button>
        <Button variant="secondary" onClick={goBack}>
          Tillbaka
        </Button>
      </Form>
    </Row>
    
  </Container>
  );
};

export default CreateNewArtistView;