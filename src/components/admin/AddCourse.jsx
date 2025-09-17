// src/components/admin/AddCourse.jsx
import React, { useState } from 'react';
import CourseService from '../../services/courseService';

function AddCourse() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    instructor: '',
    category: 'Programming',
    level: 'Beginner',
    duration: '',
    price: '',
    originalPrice: '',
    thumbnail: ''
  });

  const [lessons, setLessons] = useState([
    { title: '', duration: '', videoUrl: '' }
  ]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newCourse = {
        ...courseData,
        lessons: lessons.filter(lesson => lesson.title.trim() !== ''),
        skills: courseData.skills ? courseData.skills.split(',').map(s => s.trim()) : [],
        requirements: courseData.requirements ? courseData.requirements.split(',').map(r => r.trim()) : [],
        features: ['Lifetime access', 'Certificate', 'Mobile friendly']
      };

      CourseService.addCourse(newCourse);
      
      alert('Course added successfully! 🎉');
      resetForm();
      
    } catch (error) {
      alert('Error adding course: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCourseData({
      title: '', description: '', instructor: '', category: 'Programming',
      level: 'Beginner', duration: '', price: '', originalPrice: '', thumbnail: ''
    });
    setLessons([{ title: '', duration: '', videoUrl: '' }]);
  };

  const addLesson = () => {
    setLessons([...lessons, { title: '', duration: '', videoUrl: '' }]);
  };

  const updateLesson = (index, field, value) => {
    const updatedLessons = lessons.map((lesson, i) => 
      i === index ? { ...lesson, [field]: value } : lesson
    );
    setLessons(updatedLessons);
  };

  const removeLesson = (index) => {
    if (lessons.length > 1) {
      setLessons(lessons.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">➕ Add New Course</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded"></div>
        <p className="text-gray-600 mt-4">Create engaging courses for your students</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              DSA With C++
            </label>
            <input
              type="text"
              required
              value={courseData.title}
              onChange={(e) => setCourseData({...courseData, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., Complete React Course"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Instructor Name *
            </label>
            <input
              type="text"
              required
              value={courseData.instructor}
              onChange={(e) => setCourseData({...courseData, instructor: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., John Doe"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Course Description *
          </label>
          <textarea
            required
            rows={4}
            value={courseData.description}
            onChange={(e) => setCourseData({...courseData, description: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Describe what students will learn in this course..."
          />
        </div>

        {/* Category, Level, Duration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={courseData.category}
              onChange={(e) => setCourseData({...courseData, category: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="Programming">📱 Programming</option>
              <option value="Design">🎨 Design</option>
              <option value="Business">💼 Business</option>
              <option value="Marketing">📈 Marketing</option>
              <option value="Photography">📸 Photography</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
            <select
              value={courseData.level}
              onChange={(e) => setCourseData({...courseData, level: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="Beginner">🌱 Beginner</option>
              <option value="Intermediate">🚀 Intermediate</option>
              <option value="Advanced">⚡ Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              value={courseData.duration}
              onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., 25 hours"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Price *
            </label>
            <input
              type="text"
              required
              value={courseData.price}
              onChange={(e) => setCourseData({...courseData, price: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="₹2999 or Free"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Original Price
            </label>
            <input
              type="text"
              value={courseData.originalPrice}
              onChange={(e) => setCourseData({...courseData, originalPrice: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="₹4999"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thumbnail URL
            </label>
            <input
              type="url"
              value={courseData.thumbnail}
              onChange={(e) => setCourseData({...courseData, thumbnail: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Lessons Section */}
        <div className="border-t pt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">📚 Course Lessons</h3>
            <button
              type="button"
              onClick={addLesson}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              ➕ Add Lesson
            </button>
          </div>

          {lessons.map((lesson, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg mb-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-700">Lesson {index + 1}</h4>
                {lessons.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLesson(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    🗑️ Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => updateLesson(index, 'title', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Lesson title"
                />
                <input
                  type="text"
                  value={lesson.duration}
                  onChange={(e) => updateLesson(index, 'duration', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Duration (e.g., 15:30)"
                />
                <input
                  type="url"
                  value={lesson.videoUrl}
                  onChange={(e) => updateLesson(index, 'videoUrl', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Video URL (YouTube, etc.)"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Adding Course...
              </div>
            ) : (
              '🚀 Add Course'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;
