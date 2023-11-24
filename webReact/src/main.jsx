import './sass/main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ArtistView from './ArtistView.jsx';
import AlbumView from './AlbumView.jsx';


export const pages = [
  { path: '/', label: 'Artist', element: <ArtistView /> },
  { path: '/Album', label: 'About the artist albums', element: <AlbumView /> }
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
