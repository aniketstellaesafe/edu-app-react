import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import 'dotenv/config';
import crypto from 'crypto';

// JSON file import karne ka naya tarika
import serviceAccount from './firebase-service-account.json' with { type: 'json' };

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Admin SDK setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// API Key check karne wala Middleware
const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ success: false, error: 'Unauthorized: API key is missing.' });
  }

  try {
    const apiKeysRef = db.collection('apiKeys');
    const snapshot = await apiKeysRef.where('key', '==', apiKey).limit(1).get();

    if (snapshot.empty) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid API key.' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during authentication.' });
  }
};


// =================================================================
// ============ COURSE UPLOAD ENDPOINT (YEH BADAL GAYA HAI) ==========
// =================================================================
app.post('/api/courses/upload', async (req, res) => {
  try {
    // Ab hum frontend/Postman se 'fileId' lenge
    const { fileId, fileName, fileType, description, category, isFree } = req.body;
    
    if (!fileId || !fileName) {
        return res.status(400).json({ success: false, error: 'fileId and fileName are required.' });
    }

    // Yahan hum Google Drive ka playable URL ("Magic URL") banayenge ✨
    const videoUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

    const courseRef = await db.collection('courses').add({
      title: fileName,
      fileId: fileId,
      fileType: fileType || 'video/mp4', // Default value
      videoUrl: videoUrl, // Hum ab 'downloadUrl' ki jagah 'videoUrl' save kar rahe hain
      uploadDate: admin.firestore.FieldValue.serverTimestamp(),
      category: category || 'general',
      isFree: isFree === undefined ? true : isFree,
      description: description || `Course: ${fileName}`
    });
    
    res.status(201).json({ 
      success: true, 
      courseId: courseRef.id,
      message: 'Course uploaded successfully with playable video URL' 
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all courses endpoint (Secure hai)
app.get('/api/courses', apiKeyAuth, async (req, res) => {
  try {
    const coursesSnapshot = await db.collection('courses').orderBy('uploadDate', 'desc').get();
    const courses = coursesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// API Key banane ka endpoint
app.post('/api/generate-key', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'userId is required' });
    }

    const apiKey = crypto.randomBytes(32).toString('hex');

    await db.collection('apiKeys').add({
      key: apiKey,
      userId: userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active'
    });

    res.json({ 
      success: true, 
      message: 'API Key generated successfully. Please save it, you will not see it again.',
      apiKey: apiKey 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate API key' 
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});