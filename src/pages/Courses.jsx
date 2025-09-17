// src/pages/Courses.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import CourseService from '../services/courseService';

function Courses() {
  const { categoryName } = useParams(); // For category filtering
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryName || 'All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Programming', 'Design', 'Business', 'Marketing', 'Photography'];

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(categoryName);
    }
  }, [categoryName]);

  useEffect(() => {
    filterCourses();
  }, [courses, selectedCategory, searchTerm]);

const loadCourses = async () => { // <-- 1. Yahan async lagayein
  try {
    setLoading(true);
    const allCourses = await CourseService.getAllCourses(); // <-- 2. Yahan await lagayein
    setCourses(allCourses);
  } catch (error) {
    console.error('Error loading courses:', error);
  } finally {
    setLoading(false);
  }
};

  const filterCourses = () => {
    let filtered = courses;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => 
        course.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term)
      );
    }

    setFilteredCourses(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-xl">Loading amazing courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {categoryName ? `${categoryName} Courses` : 'All Courses'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {courses.length > 0 ? 
              `Choose from ${courses.length}+ courses designed by industry experts` :
              'Start building your skills with our upcoming courses'
            }
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 text-center">
          <p className="text-gray-600 text-lg">
            {filteredCourses.length > 0 ? (
              <>
                Showing <span className="font-semibold text-blue-600">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''}
                {selectedCategory !== 'All' && <span> in <span className="font-semibold text-purple-600">{selectedCategory}</span></span>}
                {searchTerm && <span> matching "<span className="font-semibold text-green-600">{searchTerm}</span>"</span>}
              </>
            ) : (
              'No courses found'
            )}
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CourseCard course={course} index={index} />
                </div>
              ))}
            </div>

            {/* Load More Button (if needed) */}
            {filteredCourses.length > 9 && (
              <div className="text-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Load More Courses
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">
              {searchTerm ? '🔍' : selectedCategory !== 'All' ? '📂' : '📚'}
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {searchTerm ? 'No courses found' : 
               selectedCategory !== 'All' ? `No ${selectedCategory.toLowerCase()} courses yet` :
               'No courses available'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm ? 
                'Try adjusting your search terms or browse all courses.' :
                selectedCategory !== 'All' ?
                  `We're working on adding ${selectedCategory.toLowerCase()} courses. Check back soon!` :
                  'Courses will appear here once they are added by administrators.'
              }
            </p>
            
            <div className="space-x-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {searchTerm || selectedCategory !== 'All' ? 'Clear Filters' : 'Refresh'}
              </button>
              
              {courses.length === 0 && (
                <button
                  onClick={loadCourses}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  🔄 Reload
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}

export default Courses;
