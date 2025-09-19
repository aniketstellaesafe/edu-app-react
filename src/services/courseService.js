import axios from 'axios';

// Step 1: .env file se backend URL aur API Key le rahe hain
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Agar URL ya Key define nahi hai to developer ko console mein ek saaf error dikhega
if (!API_URL || !API_KEY) {
  console.error("CRITICAL ERROR: VITE_API_URL or VITE_API_KEY is not defined in your .env file.");
}

// Step 2: Axios ka ek pre-configured instance banate hain
// Isse humein har baar URL aur headers likhne ki zaroorat nahi padegi
const apiClient = axios.create({
  baseURL: `${API_URL}/api`, // Base URL set kar diya (e.g., https://classwave-p3w6.onrender.com/api)
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY // API key header mein hamesha ke liye set kar di
  }
});

class CourseService {
  /**
   * Yeh function ab backend se live data laayega.
   * Yeh ab naye 'apiClient' ka istemaal kar raha hai.
   */
  static async getAllCourses() {
    try {
      // '/courses' endpoint par GET request bhej rahe hain
      // Poora URL aur headers automatically लग जाएंगे
      const response = await apiClient.get('/courses');
      
      // response.data.courses mein courses ka array aayega
      return response.data.courses || []; // Agar courses null aaye to empty array bhej do

    } catch (error) {
      // Agar koi error aata hai (jaise galat API key ya server down), to use console mein dikhayenge
      console.error('Error fetching courses from API:', error.response ? error.response.data.error : error.message);
      
      // App crash na ho isliye ek khali array return karenge
      return []; 
    }
  }

  // NOTE: Yeh functions abhi bhi update hone hain jab aap inke liye backend API banayenge.
  static getTotalLessons(course) {
    if (!course || !course.modules) return 0;
    return course.modules.reduce((total, module) => total + (module.lessons ? module.lessons.length : 0), 0);
  }

  static getCourseById(courseId) {
    // TODO: Iske liye ek नयी API banani hogi (e.g., /api/courses/:id)
    console.warn("getCourseById is not implemented for backend yet.");
    return null; // Abhi ke liye null return kar rahe hain
  }
}

export default CourseService;