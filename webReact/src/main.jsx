import './sass/main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ArtistView from './views/ArtistView.jsx';
import AlbumView from './views/AlbumView.jsx';
import SongView from './views/SongView.jsx';
import CreateNewArtistView from './views/CreateNewArtistView.jsx';
import CreateNewAlbumView from './views/CreateNewAlbumView.jsx';
import AddNewSongView from './views/AddNewSongView.jsx';

export const pages = [
  { path: '/', label: 'Artist', element: <ArtistView /> },
  { path: '/Album/:id', label: 'About the artist albums', element: <AlbumView /> },
  { path: '/Songs/:id', label: 'About the albums songs', element: <SongView /> },
  { path: '/CreateNewArtistView', label: 'Create new artist', element: <CreateNewArtistView /> },
  { path: '/CreateNewAlbumView/:id', label: 'Create new album', element: <CreateNewAlbumView /> },
  { path: '/AddNewSongView/:id', label: 'Create new album', element: <AddNewSongView />}
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: pages
  }
]);

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
