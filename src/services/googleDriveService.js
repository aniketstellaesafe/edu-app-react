// // src/services/googleDriveService.js
// class GoogleDriveService {
//   constructor() {
//     this.apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
//     this.clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
//   }

//   async initializeGapi() {
//     await window.gapi.load('auth2', () => {
//       window.gapi.auth2.init({
//         client_id: this.clientId,
//       });
//     });
//   }

//   async uploadCourse(courseData, videoFiles, thumbnailFile) {
//     try {
//       // Upload thumbnail
//       const thumbnailUrl = await this.uploadFile(thumbnailFile, 'thumbnails/');
      
//       // Upload course videos
//       const videoUrls = await Promise.all(
//         videoFiles.map((file, index) => 
//           this.uploadFile(file, `courses/${courseData.id}/videos/lesson-${index + 1}`)
//         )
//       );

//       // Create course object
//       const course = {
//         ...courseData,
//         thumbnail: thumbnailUrl,
//         lessons: videoUrls.map((url, index) => ({
//           id: index + 1,
//           title: `Lesson ${index + 1}`,
//           videoUrl: url,
//           duration: '10:00' // You'll need to calculate this
//         })),
//         uploadDate: new Date().toISOString()
//       };

//       return course;
//     } catch (error) {
//       console.error('Upload failed:', error);
//       throw error;
//     }
//   }

//   async uploadFile(file, folderPath) {
//     const metadata = {
//       name: file.name,
//       parents: [await this.createFolder(folderPath)]
//     };

//     const form = new FormData();
//     form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
//     form.append('file', file);

//     const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
//       method: 'POST',
//       headers: new Headers({
//         'Authorization': `Bearer ${await this.getAccessToken()}`
//       }),
//       body: form
//     });

//     const result = await response.json();
//     return `https://drive.google.com/file/d/${result.id}/view`;
//   }
// }

// export default new GoogleDriveService();
