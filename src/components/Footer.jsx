// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Copyright Text */}
        <p className="text-sm">
          &copy; 2024 EduApp. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="mt-4 flex space-x-6">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white transition duration-300" aria-label="Facebook">
            {/* Facebook SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.959.192-1.333 1.583-1.333h2.417v-3h-2.417c-3.15 0-4.583 1.284-4.583 4.583v1.417z" />
            </svg>
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white transition duration-300" aria-label="Twitter">
            {/* Twitter SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.799-1.574 2.162-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.594 0-6.518 2.923-6.518 6.518 0 .51.058 1.006.171 1.481-5.418-.272-10.203-2.864-13.411-6.792-.562.964-.888 2.08-.888 3.272 0 2.261 1.155 4.258 2.91 5.419-.537-.019-1.04-.165-1.99-.548v.081c0 3.161 2.253 5.799 5.257 6.417-.552.152-1.137.234-1.742.234-.427 0-.842-.04-1.248-.112.836 2.607 3.255 4.512 6.136 4.566-2.227 1.748-5.044 2.8-8.125 2.8-.53 0-1.053-.031-1.568-.093 2.936 1.879 6.071 2.968 9.539 2.968 11.455 0 17.702-9.49 17.702-17.702 0-.269-.006-.537-.015-.805 1.214-.875 2.269-1.956 3.116-3.195z" />
            </svg>
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-white transition duration-300" aria-label="Instagram">
            {/* Instagram SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.013 4.851.071 4.316.212 5.644 1.841 5.867 5.867.058 1.267.071 1.647.071 4.851s-.013 3.584-.071 4.851c-.223 4.026-1.551 5.655-5.867 5.867-1.267.058-1.647.071-4.851.071s-3.584-.013-4.851-.071c-4.316-.223-5.644-1.852-5.867-5.867-.058-1.267-.071-1.647-.071-4.851s.013-3.584.071-4.851c.223-4.026 1.551-5.655 5.867-5.867 1.267-.058 1.647-.071 4.851-.071zm0-2.163c-3.266 0-3.673.013-4.94.072-4.407.225-6.733 2.551-6.958 6.958-.06 1.267-.072 1.674-.072 4.94s.013 3.673.072 4.94c.225 4.407 2.551 6.733 6.958 6.958 1.267.06 1.674.072 4.94.072s3.673-.013 4.94-.072c4.407-.225 6.733-2.551 6.958-6.958.06-1.267.072-1.674.072-4.94s-.013-3.673-.072-4.94c-.225-4.407-2.551-6.733-6.958-6.958-1.267-.06-1.674-.072-4.94-.072zm0 6.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm6.5-7.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;