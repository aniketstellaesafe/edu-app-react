// src/pages/Home.jsx

import React from 'react';

const Home = () => {
  return (
    <div className="flex-1 p-8">
      {/* Hero Section / YouTube Video Banner */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="relative w-full h-96">
          {/* YouTube video embed */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Course Card Components Yahan aayenge */}
          {/* Abhi ke liye placeholders add kar rahe hain */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">Course 1</h3>
            <p className="text-gray-600">This is a description of the first course.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">Course 2</h3>
            <p className="text-gray-600">This is a description of the second course.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">Course 3</h3>
            <p className="text-gray-600">This is a description of the third course.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;