// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Firebase user state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              {/* Yahan par apna logo image lagao */}
              <img className="h-10 w-auto" src="/path/to/your/logo.png" alt="EduApp Logo" />
            </div>

            {/* Search Bar */}
            <div className="ml-10 hidden md:flex items-center border border-gray-300 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Type here to search..."
                className="px-4 py-2 w-72 text-sm focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition duration-300">
                🔍
              </button>
            </div>
          </div>

          {/* Nav Links and Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {/* Always visible links */}
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Courses
              </Link>
              <Link
                to="/doubts"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Doubts
              </Link>

              {/* Conditional Buttons */}
              {user ? (
                <Link
                  to="/profile"
                  className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
                >
                  Profile
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;