import React from 'react';
import { Link } from 'react-router-dom';

// Logic ko component se alag kiya
const calculateDiscount = (course) => {
    const original = parseFloat(course.originalPrice.replace('₹', '').replace(',', ''));
    const current = parseFloat(course.price.replace('₹', '').replace(',', ''));
    return Math.round(((original - current) / original) * 100);
};

// CourseCard Component
const CourseCard = ({ course, index }) => {
    return (
        <div 
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 overflow-hidden animate-fadeInUp border border-gray-100 hover:border-blue-200"
            style={{ 
                animationDelay: `${index * 150}ms`,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)'
            }}
        >
            {/* Image Container with Enhanced Hover Effects */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-all duration-700 filter group-hover:brightness-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="bg-white/95 backdrop-blur-lg px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800 shadow-lg border border-white/20">
                        {course.category}
                    </span>
                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                        {calculateDiscount(course)}% OFF
                    </div>
                </div>

                {/* Floating Action Button */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 relative">
                {/* Level and Rating Row */}
                <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold transform hover:scale-105 transition-transform duration-300 ${
                        course.level === 'Beginner' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' :
                        course.level === 'Intermediate' ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200' :
                        'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200'
                    }`}>
                        {course.level}
                    </span>
                    
                    <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full">
                        <span className="text-yellow-400 animate-pulse">⭐</span>
                        <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                        <span className="text-gray-500 text-xs">({course.students.toLocaleString()})</span>
                    </div>
                </div>

                {/* Title with Hover Effect */}
                <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-500 line-clamp-2 leading-tight">
                    {course.title}
                </h3>

                {/* Instructor */}
                <p className="text-gray-600 text-sm mb-4 font-medium">
                    By <span className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-300">{course.instructor}</span>
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6 bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center space-x-1">
                        <span className="text-blue-500">🕒</span>
                        <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="text-green-500">👥</span>
                        <span className="font-medium">{course.students.toLocaleString()}</span>
                    </div>
                </div>

                {/* Price and CTA Section */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                            <span className="text-sm text-gray-500 line-through font-medium">{course.originalPrice}</span>
                        </div>
                        <span className="text-xs text-green-600 font-semibold mt-1">
                            Save ₹{parseFloat(course.originalPrice.replace('₹', '').replace(',', '')) - parseFloat(course.price.replace('₹', '').replace(',', ''))}
                        </span>
                    </div>
                    
                    <Link
                        to={`/course/${course.id}`}
                        className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 transform hover:scale-105 hover:shadow-lg transition-all duration-300 relative overflow-hidden group/btn"
                    >
                        <span className="relative z-10">Enroll Now</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                </div>
                
                {/* Progress Bar Animation */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-400/10 to-yellow-400/10 rounded-full transform -translate-x-8 translate-y-8 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
        </div>
    );
};

export default CourseCard;