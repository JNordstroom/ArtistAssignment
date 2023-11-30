import { useState } from 'react';
import { post } from '../utilsAndHooks/ApiService';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';

const CreateNewAlbumView = () => {
  const [formData, setFormData] = useState({ Namn: '', Publicerad: null, ArtisterId: null});
  const navigate = useNavigate();
  const { id: artistId } = useParams(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(artistId);
    console.log(formData);
    try {
        
      const response = await post('album/createnewalbum', {
        ...formData,
        Namn: formData.Namn,
        // Parsing the user input
        Publicerad: parseInt(formData.Publicerad, 10),  
        ArtisterId: artistId,
      });
  
      if (response.error) {
        console.error('Error creating new album:', response.error);
      } else {
        alert('Album added successfully!');
        
        // route back to that artist albumpage
        navigate(`/Album/${artistId}`);  
      }
    } catch (error) {
      console.error('Error creating new album:', error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ width: "90%", maxWidth: "800px", minHeight: "100vh", fontSize: "1.2rem"}}>
      <Row>
      <h1 className='d-flex justify-content-center mb-4'>Lägg till nytt album</h1>
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
  
          <Form.Group className="mb-3" controlId="Publicerad">
            <Form.Label>Publicerad</Form.Label>
            <Form.Control
              as="textarea"
              name="Publicerad"
              value={formData.Publicerad}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Button type="submit" variant="primary" style={{ marginRight: '0.5rem' }}>
            Lägg till albumet
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