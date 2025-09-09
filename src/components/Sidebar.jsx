// src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg pt-8">
      <div className="px-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          MAIN MENU
        </h3>
        <nav>
          <ul>
            <li>
              <Link to="/" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">🏠</span> Home
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/paid-classes" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">💰</span> Paid Classes
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/free-courses" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">🆓</span> Free Courses
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/test-series" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">📝</span> Paid Test Series
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/weekly-test" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">🗓️</span> Free Weekly Test
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/previous-papers" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">📚</span> Previous Years' Papers
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/books" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">📖</span> Books
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/books-demo" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">💡</span> Books Demo
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/quiz" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">❓</span> Quiz
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/job-alerts" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">🔔</span> Job Alerts
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/blogs" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition duration-300">
                <span className="mr-3">✍️</span> Blogs
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;