import "./sass/main.scss";
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get } from './utilsAndHooks/ApiService'


export default function App() {

  const [globals, setGlobals] = useState({
    movies: []
  });

    useEffect(() => {
      (async () => {
        setGlobals({
          ...globals,
          artist: await get('artist/alla')
        });
      })();
    }, []);

    return <>
    <header>
      
    </header>
    <main className="container mt-1">
      <Outlet context={[globals]} />
    </main>
    <footer className="container-fluid">
      
    </footer>
  </>;
}