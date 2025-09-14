// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';

import App from './App.jsx';
import Courses from './pages/Courses.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Profile from './pages/Profile.jsx';
import Home from './pages/Home.jsx';
import EditProfile from './pages/EditProfile.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import Upgrade from './pages/Upgrade.jsx'; // <-- Import the new component
import CoursePage from './pages/CoursePage.jsx'; // <-- Yahan naya component import kiya

const router = createBrowserRouter([
  // Public Routes
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },

  // Private Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <Home /> },
          { path: 'courses', element: <Courses /> },
          { path: 'profile', element: <Profile /> },
          { path: 'profile/edit', element: <EditProfile /> },
          { path: 'profile/change-password', element: <ChangePassword /> },
          { path: 'upgrade', element: <Upgrade /> }, // <-- Add this new route
          { path: 'course/:id', element: <CoursePage /> }, // <-- Yeh hai tumhara naya dynamic route
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