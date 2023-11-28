import { useState } from 'react';
import { post } from '../utilsAndHooks/ApiService';
import { useNavigate, useParams } from 'react-router-dom';

const CreateNewAlbumView = () => {
  const [formData, setFormData] = useState({ Namn: '', Placering: null, AlbumId: null});
  const navigate = useNavigate();
  const { id: AlbumId } = useParams(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(AlbumId);
    console.log(formData);
    try {
        
      const response = await post('låt/addnewsong', {
        ...formData,
        Namn: formData.Namn,
        // Parsing the user input
        Placering: parseInt(formData.Placering, 10),  
        AlbumId: AlbumId,
      });
  
      if (response.error) {
        console.error('Fel vid försök att lägga till låten:', response.error);
      } else {
        alert('Låten tillagd!');
        
        // route back to that the songpage
        navigate(`/Songs/${AlbumId}`);  
      }
    } catch (error) {
      console.error('Fel vid försök att skapa låt:', error);
    }
  };

  return (
    <div>
      <h1>Lägg till ny låt</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Namn" className="form-label">
            Namn
          </label>
          <input
            type="text"
            className="form-control"
            id="Namn"
            name="Namn"
            value={formData.Namn}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className="mb-3">
          <label htmlFor="Publicerad" className="form-label">
            Placering
          </label>
          <textarea
            className="form-control"
            id="Publicerad"
            name="Publicerad"
            value={formData.Publicerad}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        
        <button type="submit" className="btn btn-primary">
          Lätt till låten
        </button>
      </form>
    </div>
  );
};

export default CreateNewAlbumView;