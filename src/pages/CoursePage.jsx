import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { featuredCourses } from '../data/homeData';

// Logic functions ko component se bahar nikaal diya
const calculateDiscount = (course) => {
    if (!course) return 0;
    const original = parseFloat(course.originalPrice.replace('₹', '').replace(',', ''));
    const current = parseFloat(course.price.replace('₹', '').replace(',', ''));
    return Math.round(((original - current) / original) * 100);
};

const calculateSavings = (course) => {
    if (!course) return 0;
    const original = parseFloat(course.originalPrice.replace('₹', '').replace(',', ''));
    const current = parseFloat(course.price.replace('₹', '').replace(',', ''));
    return original - current;
};

// Data arrays ko alag file mein rakho, jaise homeData.js
const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'curriculum', label: 'Curriculum', icon: '📚' },
    { id: 'instructor', label: 'Instructor', icon: '👨‍🏫' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' }
];

const mockCurriculum = [
    { title: 'Introduction to the Course', duration: '15 min', locked: false },
    { title: 'Getting Started', duration: '25 min', locked: false },
    { title: 'Core Concepts', duration: '45 min', locked: true },
    { title: 'Advanced Techniques', duration: '60 min', locked: true },
    { title: 'Final Project', duration: '90 min', locked: true }
];

const mockReviews = [
    { name: 'Rahul Sharma', rating: 5, comment: 'Excellent course! Very detailed and well-explained.', date: '2 days ago' },
    { name: 'Priya Patel', rating: 4, comment: 'Great content, but could use more practical examples.', date: '1 week ago' },
    { name: 'Amit Kumar', rating: 5, comment: 'Best investment I made for my career!', date: '2 weeks ago' }
];

const CoursePage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [isEnrolled, setIsEnrolled] = useState(false);

    // FIX: Scroll to the top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Simulate loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const course = featuredCourses.find(c => c.id.toString() === id);

    // --- Loading State UI ---
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">Loading Course Details...</p>
                </div>
            </div>
        );
    }

    // --- Course Not Found UI ---
    if (!course) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center animate-fadeInUp">
                <div className="text-center bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4">
                    <div className="text-6xl mb-4 animate-bounce">😔</div>
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Course Not Found!</h1>
                    <p className="text-gray-600 mb-6">The course you are looking for does not exist or has been removed.</p>
                    <Link
                        to="/"
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* --- Hero Section with Course Details --- */}
            <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden pt-24">
                {/* ... Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-float-delay"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-400/20 rounded-full animate-float"></div>
                </div>

                <div className="relative container mx-auto px-6 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="animate-slideInLeft">
                            {/* ... Breadcrumb, Category Badge, Title, Instructor, Price, CTA Buttons ... */}
                            <nav className="mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                                <Link to="/" className="text-blue-200 hover:text-white transition-colors duration-300">
                                    Home
                                </Link>
                                <span className="mx-2 text-blue-300">/</span>
                                <span className="text-white">Course Details</span>
                            </nav>

                            <div className="mb-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                                <span className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                                    <span className="mr-2">{course.category}</span>
                                    <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs">
                                        {course.level}
                                    </span>
                                </span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                                {course.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white font-bold text-lg">
                                            {course.instructor.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-blue-200 text-sm">Instructor</p>
                                        <p className="font-semibold">{course.instructor}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6 text-blue-200">
                                    <div className="flex items-center">
                                        <span className="text-yellow-400 mr-1">⭐</span>
                                        <span className="font-semibold text-white">{course.rating}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-1">👥</span>
                                        <span>{course.students.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-1">🕒</span>
                                        <span>{course.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 mb-8 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                                <span className="text-3xl font-bold">{course.price}</span>
                                <span className="text-xl text-blue-300 line-through">{course.originalPrice}</span>
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                                    {calculateDiscount()}% OFF
                                </span>
                            </div>

                            <p className="text-green-300 text-sm mb-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                                💰 You save ₹{calculateSavings().toLocaleString()} on this course!
                            </p>

                            <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                                <button
                                    onClick={() => setIsEnrolled(true)}
                                    className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                                        isEnrolled
                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                            : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900'
                                    }`}
                                >
                                    {isEnrolled ? '✅ Enrolled!' : '🎯 Enroll Now'}
                                </button>
                                <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                                    💝 Add to Wishlist
                                </button>
                            </div>
                        </div>

                        {/* Right Content - Course Image */}
                        <div className="animate-slideInRight">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500"></div>
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="relative w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                                
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
                                        <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Course Content Section --- */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs Navigation */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeInUp">
                            <div className="border-b border-gray-200">
                                <nav className="flex">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center px-6 py-4 text-sm font-medium transition-all duration-300 ${
                                                activeTab === tab.id
                                                    ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span className="mr-2">{tab.icon}</span>
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="p-8">
                                {activeTab === 'overview' && (
                                    <div className="animate-fadeInUp">
                                        <h3 className="text-2xl font-bold mb-4">Course Overview</h3>
                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            {course.description || "This comprehensive course will take you from beginner to advanced level. You'll learn industry-standard practices and work on real-world projects that will enhance your portfolio."}
                                        </p>
                                        
                                        <h4 className="text-xl font-semibold mb-4">What You'll Learn:</h4>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {[
                                                'Master the fundamentals',
                                                'Build real-world projects',
                                                'Industry best practices',
                                                'Advanced techniques',
                                                'Portfolio development',
                                                'Career guidance'
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center animate-slideInLeft" style={{ animationDelay: `${index * 0.1}s` }}>
                                                    <span className="text-green-500 mr-3">✅</span>
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'curriculum' && (
                                    <div className="animate-fadeInUp">
                                        <h3 className="text-2xl font-bold mb-6">Course Curriculum</h3>
                                        <div className="space-y-4">
                                            {mockCurriculum.map((lesson, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 animate-slideInLeft" style={{ animationDelay: `${index * 0.1}s` }}>
                                                    <div className="flex items-center">
                                                        <span className={`mr-4 ${lesson.locked ? 'text-gray-400' : 'text-green-500'}`}>
                                                            {lesson.locked ? '🔒' : '▶️'}
                                                        </span>
                                                        <div>
                                                            <h4 className="font-medium">{lesson.title}</h4>
                                                            <p className="text-sm text-gray-600">{lesson.duration}</p>
                                                        </div>
                                                    </div>
                                                    {lesson.locked && (
                                                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Premium</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'instructor' && (
                                    <div className="animate-fadeInUp">
                                        <div className="flex items-start space-x-6">
                                            <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                                {course.instructor.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2">{course.instructor}</h3>
                                                <p className="text-blue-600 font-medium mb-4">Senior Developer & Instructor</p>
                                                <p className="text-gray-700 leading-relaxed">
                                                    Expert instructor with over 10 years of industry experience. Has taught thousands of students and helped them achieve their career goals.
                                                </p>
                                                <div className="mt-4 flex space-x-4">
                                                    <span className="text-sm text-gray-600">📚 50+ Courses</span>
                                                    <span className="text-sm text-gray-600">👥 100K+ Students</span>
                                                    <span className="text-sm text-gray-600">⭐ 4.8 Rating</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="animate-fadeInUp">
                                        <h3 className="text-2xl font-bold mb-6">Student Reviews</h3>
                                        <div className="space-y-6">
                                            {mockReviews.map((review, index) => (
                                                <div key={index} className="border-b border-gray-200 pb-6 animate-slideInLeft" style={{ animationDelay: `${index * 0.1}s` }}>
                                                    <div className="flex items-start space-x-4">
                                                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                                                            {review.name.charAt(0)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h4 className="font-semibold">{review.name}</h4>
                                                                <span className="text-sm text-gray-500">{review.date}</span>
                                                            </div>
                                                            <div className="flex items-center mb-2">
                                                                {[...Array(review.rating)].map((_, i) => (
                                                                    <span key={i} className="text-yellow-400">⭐</span>
                                                                ))}
                                                            </div>
                                                            <p className="text-gray-700">{review.comment}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 animate-slideInRight">
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-gray-900 mb-2">{course.price}</div>
                                <div className="text-lg text-gray-500 line-through mb-2">{course.originalPrice}</div>
                                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                                    {calculateDiscount()}% OFF - Limited Time!
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEnrolled(true)}
                                className={`w-full py-4 rounded-xl font-bold text-lg mb-4 transition-all duration-300 transform hover:scale-105 ${
                                    isEnrolled
                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                                }`}
                            >
                                {isEnrolled ? '✅ Enrolled Successfully!' : '🚀 Enroll Now'}
                            </button>

                            <div className="text-center text-sm text-gray-600 mb-6">
                                💰 30-day money-back guarantee
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">📺 Total Duration</span>
                                    <span className="font-medium">{course.duration}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">📱 Mobile Access</span>
                                    <span className="font-medium">✅ Yes</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">🏆 Certificate</span>
                                    <span className="font-medium">✅ Included</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">👥 Students</span>
                                    <span className="font-medium">{course.students.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Style section for animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                @keyframes float-delay {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-15px);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }

                .animate-slideInLeft {
                    animation: slideInLeft 0.6s ease-out forwards;
                }

                .animate-slideInRight {
                    animation: slideInRight 0.6s ease-out forwards;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-delay {
                    animation: float-delay 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default CoursePage;