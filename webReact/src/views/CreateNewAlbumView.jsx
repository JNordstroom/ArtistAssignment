import { useState } from 'react';
import { post } from '../utilsAndHooks/ApiService';
import { useNavigate, useParams } from 'react-router-dom';

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

  return (
    <div>
      <h1>Lägg till nytt album</h1>
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
            Publicerad
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
          Lätt till album
        </button>
      </form>
    </div>
  );
};

export default CreateNewAlbumView;