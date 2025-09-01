import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import App from './App.jsx';
import Auth from './components/Auth.jsx';
import Courses from './components/Courses.jsx';
import Doubts from './components/Doubts.jsx';
import Profile from './components/Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Courses /> },
      { path: 'auth', element: <Auth /> },
      { path: 'doubts', element: <Doubts /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);