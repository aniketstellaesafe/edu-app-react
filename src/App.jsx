import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        {/* Outlet ek placeholder hai. URL ke hisaab se 
            Courses, Login, ya Signup component yahan dikhega. */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;