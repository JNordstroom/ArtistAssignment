import { useState } from 'react';
import { post } from '../utilsAndHooks/ApiService'; 
import { useNavigate } from 'react-router-dom';

const CreateNewArtistView = () => {
  const [formData, setFormData] = useState({ artistName: '', artistDescription: '' });
  const [error, setError] = useState(null);
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
        Namn: formData.artistName,
        Beskrivning: formData.artistDescription
      });

      if (response.error) {
        setError(response.error);
      } else {
        setError(null);
        // popup to show that the artist is added
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
    <div>
      <h1>Lägg till ny artist</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="artistName" className="form-label">Artistens namn</label>
          <input
            type="text"
            className="form-control"
            id="artistName"
            name="artistName"
            value={formData.artistName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="artistDescription" className="form-label">Artistens beskrivning</label>
          <textarea
            className="form-control"
            id="artistDescription"
            name="artistDescription"
            value={formData.artistDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Lägg till</button>
        <button onClick={goBack} className='mb-1 btn '>Tillbaka</button>
      </form>

      
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default CreateNewArtistView;