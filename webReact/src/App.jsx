import "./sass/main.scss";
import { Outlet } from 'react-router-dom';
import { useState } from 'react';


export default function App() {

  const [artist, setArtist] = useState([]);
  get('/api/artister', setArtist);


  return <>
    <header>
    </header>
    <main className="container mt-5">
      <Outlet context={{ artist }} />
    </main>
    <footer>  
    </footer>
  </>
}