import axios from 'axios';

// Backend ka base URL
const API_URL = 'http://localhost:5000/api';

// .env.local se API Key ko safely access karein
const API_KEY = import.meta.env.VITE_API_KEY;

class CourseService {
  
  /**
   * Yeh function ab backend se live data laayega.
   */
  static async getAllCourses() {
    try {
      if (!API_KEY) {
        throw new Error("API Key is not defined in .env.local file. Please add VITE_API_KEY.");
      }

      const response = await axios.get(`${API_URL}/courses`, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      return response.data.courses; // Sirf courses ka array return karein

    } catch (error) {
      console.error('Error fetching courses from API:', error.response ? error.response.data : error.message);
      // Agar backend se data na aaye, toh fallback ke liye ek empty array bhej dein
      return []; 
    }
  }

  // NOTE: Neeche diye gaye functions abhi kaam nahi karenge kyunki
  // yeh static data par depend karte the. Inhe baad mein backend se 
  // connect karna padega jab aap single course fetch karne ki API banayenge.

  static getTotalLessons(course) {
    if (!course.modules) return course.lessons?.length || 0;
    return course.modules.reduce((total, module) => total + module.lessons.length, 0);
  }

  static getCourseById(courseId) {
    // TODO: Iske liye ek नयी API banani hogi (e.g., /api/courses/:id)
    console.warn("getCourseById is using static data and needs to be updated.");
    return null;
  }
  
  // ... baaki ke purane functions ...
}

export default CourseService;