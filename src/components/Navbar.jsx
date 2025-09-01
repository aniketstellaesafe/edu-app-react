import React from 'react';

const Navbar = () => {
  // Yeh bas ek simple placeholder navbar hai
  // Isme hum baad me links aur login/logout button daalenge
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800">EduApp</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Yahan navigation links aayenge */}
              <a href="/" className="text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Courses</a>
              <a href="/doubts" className="text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Doubts</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;