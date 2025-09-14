// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { banners, featuredCourses, categories } from '../data/homeData.js';

const Home = () => {
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isVisible, setIsVisible] = useState({});

    // Auto-rotate banners
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Simplified visibility for featured courses - always show them
    useEffect(() => {
        setTimeout(() => {
            setIsVisible({
                categories: true,
                stats: true,
                courses: true
            });
        }, 100);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Banner Section */}
            <div className="relative h-96 md:h-[500px] overflow-hidden mb-12">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-all duration-1000 ${
                            index === currentBanner ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                    >
                        <div className="relative h-full">
                            <img 
                                src={banner.image} 
                                alt={banner.title}
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-80`}></div>
                            
                            <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                                <div className="max-w-4xl animate-fadeInUp">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slideInDown">
                                        {banner.title}
                                    </h1>
                                    <p className="text-xl md:text-2xl mb-2 animate-slideInUp">
                                        {banner.subtitle}
                                    </p>
                                    <p className="text-lg mb-8 animate-fadeIn" style={{animationDelay: '0.5s'}}>
                                        {banner.description}
                                    </p>
                                    <Link
                                        to={banner.link}
                                        className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg animate-bounceIn"
                                        style={{animationDelay: '0.8s'}}
                                    >
                                        Explore Course
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Banner Navigation Dots */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentBanner(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentBanner ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Categories Section */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Explore Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category, index) => (
                            <Link
                                key={category.name}
                                to={`/category/${category.name.toLowerCase()}`}
                                className={`group bg-white rounded-xl p-6 text-center hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-blue-300 ${
                                    isVisible.categories ? 'animate-slideInUp' : 'opacity-0'
                                }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                    {category.icon}
                                </div>
                                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{category.count} courses</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Featured Courses Section */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Featured Courses
                        </h2>
                        <p className="text-gray-600 text-lg">Discover our most popular and highly-rated courses</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCourses.map((course, index) => (
                            <CourseCard key={course.id} course={course} index={index} />
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <Link
                            to="/courses"
                            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            View All Courses
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center ${
                        isVisible.stats ? 'animate-fadeInUp' : 'opacity-0'
                    }`}>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-2">10</div>
                            <div className="text-blue-100">Happy Students</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-2">5+</div>
                            <div className="text-blue-100">Expert Instructors</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-2">50</div>
                            <div className="text-blue-100">Online Courses</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-2">4.8★</div>
                            <div className="text-blue-100">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Style section for animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInDown {
                    from { opacity: 0; transform: translateY(-50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes bounceIn {
                    0% { opacity: 0; transform: scale(0.3); }
                    50% { opacity: 1; transform: scale(1.05); }
                    70% { transform: scale(0.9); }
                    100% { opacity: 1; transform: scale(1); }
                }
                
                .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
                .animate-slideInDown { animation: slideInDown 0.8s ease-out; }
                .animate-slideInUp { animation: slideInUp 0.8s ease-out; }
                .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
                .animate-fadeIn { animation: fadeIn 1s ease-out; }
                .animate-bounceIn { animation: bounceIn 1s ease-out; }
            `}</style>
        </div>
    );
};

export default Home;