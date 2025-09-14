import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, Clock, Users, ChevronDown } from 'lucide-react';
import CourseCard from '../components/CourseCard'; // Assuming you moved CourseCard here

// Assuming your data file is at src/data/homeData.js
// If you are using a Google Drive ID, replace this fetch logic
import { featuredCourses } from '../data/homeData';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Web Development', 'Data Science', 'Design', 'AI/ML', 'Marketing', 'Backend'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCourses = featuredCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white py-20 mt-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Discover Your
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Perfect Course
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
            Master new skills with our expertly crafted online courses
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 animate-fade-in-up animation-delay-400">
              <div className="flex items-center bg-white rounded-xl p-2">
                <Search className="w-5 h-5 text-gray-500 ml-3" />
                <input
                  type="text"
                  placeholder="Search for courses..."
                  className="flex-1 px-4 py-3 text-gray-900 bg-transparent outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-sm animate-slide-up">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pr-8 appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* Level Filter */}
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pr-8 appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-white shadow-md text-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-white shadow-md text-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredCourses.length} of {featuredCourses.length} courses
          </div>
        </div>

        {/* Courses Grid */}
        <div className={`grid gap-8 animate-fade-in ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Search className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No courses match your search</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;