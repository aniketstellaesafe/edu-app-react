import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';

// Components aur Pages ko import karein
import App from './App.jsx';
import Courses from './components/Courses.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Naye guard ko import karein

const router = createBrowserRouter([
  // Public Routes: Yeh routes koi bhi dekh sakta hai
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },

  // Private Routes: Yeh routes sirf logged-in user hi dekh sakte hain
  {
    element: <ProtectedRoute />, // Yahan humne guard ko main gate par khada kar diya
    children: [
      // Iske andar ke saare raste ab protected hain
      {
        path: '/',
        element: <App />, // App layout (Navbar, etc.)
        children: [
          { index: true, element: <Courses /> },
          // { path: 'doubts', element: <Doubts /> }, // Future me yahan aur protected page aayenge
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);