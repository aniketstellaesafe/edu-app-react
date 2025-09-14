// src/components/CourseUploader.jsx

import React from 'react';
import useDrivePicker from 'react-google-drive-picker';

// Yahan apna Client ID daalo
const CLIENT_ID = '295552788013-u4p1qqtshjupf4cd3d2tbpp4gti599la.apps.googleusercontent.com'; 

const CourseUploader = () => {
  const [openPicker] = useDrivePicker();

  const handleOpenPicker = () => {
    openPicker({
      clientId: CLIENT_ID,
      viewId: 'DOCS', // Ab video, pdf, docs sab dikhenge
      showUploadView: true,
      showUploadFolders: true,
      callbackFunction: (data) => {
        if (data.action === 'picked') {
          const file = data.docs[0];
          console.log('File ID:', file.id);
          console.log('File Name:', file.name);
          alert(`File: ${file.name} successfully picked!`);
          // Ab tum is file ID ko aage use kar sakte ho
        }
      },
    });
  };

  return (
    <div className="text-center p-8 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload a Course from Google Drive</h2>
      <button
        onClick={handleOpenPicker}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Choose Course from Drive
      </button>
    </div>
  );
};

export default CourseUploader;