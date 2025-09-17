import React, { useState } from 'react';
import useDrivePicker from 'react-google-drive-picker';

const CLIENT_ID = 'your-client-id-here';
const API_KEY = 'your-api-key-here';

const CourseUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openPicker] = useDrivePicker();

  const handleOpenPicker = () => {
    openPicker({
      clientId: CLIENT_ID,
      developerKey: API_KEY,
      viewId: 'DOCS', // Videos, PDFs, docs सब दिखेंगे
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true, // Multiple files select करने के लिए
      callbackFunction: (data) => {
        if (data.action === 'picked') {
          const files = data.docs;
          setSelectedFiles(files);
          
          // Files को process करें
          files.forEach(file => {
            console.log('File ID:', file.id);
            console.log('File Name:', file.name);
            console.log('File Type:', file.mimeType);
            
            // Database में save करने के लिए API call
            uploadCourseToServer(file);
          });
        }
      },
    });
  };

  const uploadCourseToServer = async (file) => {
    try {
      const response = await fetch('/api/courses/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileId: file.id,
          fileName: file.name,
          fileType: file.mimeType,
          downloadUrl: `https://drive.google.com/file/d/${file.id}/view`
        })
      });
      
      if (response.ok) {
        console.log('Course uploaded successfully');
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleOpenPicker}>
        Google Drive से Course Upload करें
      </button>
      
      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          {selectedFiles.map(file => (
            <div key={file.id}>
              <p>{file.name} - {file.mimeType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
