import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container"> {/* Yahan class name add kiya hai */}
      <Navbar />
      <div className="flex flex-1"> {/* Naya div banaya Sidebar aur Outlet ke liye */}
      <Sidebar />
      <main className="flex-1">
        {/* Outlet ek placeholder hai. URL ke hisaab se 
            Courses, Login, ya Signup component yahan dikhega. */}
        <Outlet />
      </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;