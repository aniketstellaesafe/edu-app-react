// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import CourseService from '../services/courseService';
import { banners, featuredCourses, categories } from '../data/homeData.js';

function Home() {
    const [currentBanner, setCurrentBanner] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
     const [featuredCourses, setFeaturedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        totalInstructors: 0,
        avgRating: 4.8
    });
    const heroRef = useRef(null);

    // Enhanced mouse tracking for parallax effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / 50,
                y: (e.clientY - window.innerHeight / 2) / 50
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Auto-rotate banners with smooth transitions
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 6000); // Increased to 6 seconds for better UX
        return () => clearInterval(timer);
    }, []);

    // Enhanced intersection observer with better performance
    useEffect(() => {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const sectionName = entry.target.getAttribute('data-section');
                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    setIsVisible(prev => ({ ...prev, [sectionName]: true }));
                }
            });
        }, observerOptions);

        // Delayed observation for better performance
        setTimeout(() => {
            document.querySelectorAll('[data-section]').forEach((section) => {
                observer.observe(section);
            });
        }, 100);

        return () => observer.disconnect();
    }, []);

    // Load courses and calculate stats
    useEffect(() => {
        const loadCourses = () => {
            try {
                setLoading(true);
                const allCourses = CourseService.getAllCourses();
                
                // Get featured courses (first 3 or highest rated)
                const featured = allCourses
                    .sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5))
                    .slice(0, 3);
                
                setFeaturedCourses(featured);

                // Calculate stats
                const totalStudents = allCourses.reduce((sum, course) => sum + (course.students || 0), 0);
                const instructors = [...new Set(allCourses.map(course => course.instructor))];
                const avgRating = allCourses.length > 0 
                    ? allCourses.reduce((sum, course) => sum + (course.rating || 4.5), 0) / allCourses.length 
                    : 4.8;

                setStats({
                    totalCourses: allCourses.length,
                    totalStudents: totalStudents + 1000, // Add base students
                    totalInstructors: instructors.length + 5, // Add base instructors
                    avgRating: avgRating
                });

                setLoading(false);
            } catch (error) {
                console.error('Error loading courses:', error);
                setLoading(false);
            }
        };

        loadCourses();
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-16 overflow-hidden">
            {/* Enhanced Hero Banner Section with Parallax */}
            <div className="relative h-96 md:h-[600px] overflow-hidden mb-20 shadow-2xl" ref={heroRef}>
                {/* Parallax Background Elements */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                    }}
                >
                    <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-2xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-pink-400 to-red-600 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
                            index === currentBanner 
                                ? 'opacity-100 scale-100 translate-x-0' 
                                : index < currentBanner 
                                    ? 'opacity-0 scale-95 -translate-x-full' 
                                    : 'opacity-0 scale-95 translate-x-full'
                        }`}
                    >
                        <div className="relative h-full">
                            <div className="absolute inset-0 bg-black/30 z-10"></div>
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[20s] ease-out"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90 z-20`}></div>
                            
                            {/* Enhanced Floating Particles */}
                            <div className="absolute inset-0 z-30">
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`absolute rounded-full animate-float-complex ${
                                            i % 3 === 0 ? 'w-3 h-3 bg-white/40' :
                                            i % 3 === 1 ? 'w-2 h-2 bg-blue-300/50' :
                                            'w-1 h-1 bg-purple-300/60'
                                        }`}
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDelay: `${i * 0.6}s`,
                                            animationDuration: `${5 + Math.random() * 3}s`
                                        }}
                                    ></div>
                                ))}
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8 z-40">
                                <div className="max-w-5xl">
                                    <h1 className="text-5xl md:text-8xl font-black mb-8 animate-title-cascade tracking-tight">
                                        {banner.title.split(' ').map((word, wordIndex) => (
                                            <span 
                                                key={wordIndex}
                                                className="inline-block animate-word-reveal"
                                                style={{ animationDelay: `${wordIndex * 0.2}s` }}
                                            >
                                                {word}&nbsp;
                                            </span>
                                        ))}
                                    </h1>
                                    <p className="text-2xl md:text-4xl mb-6 animate-subtitle-fade font-light opacity-95 leading-relaxed">
                                        {banner.subtitle}
                                    </p>
                                    <p className="text-lg md:text-2xl mb-12 animate-description-slide max-w-3xl mx-auto leading-relaxed opacity-90">
                                        {banner.description}
                                    </p>
                                    <div className="animate-cta-bounce">
                                        <Link
                                            to={banner.link}
                                            className="group relative inline-flex items-center bg-white/10 backdrop-blur-md text-white px-12 py-5 rounded-full font-bold text-xl border-2 border-white/30 hover:bg-white hover:text-gray-900 transform hover:scale-110 hover:-translate-y-2 transition-all duration-700 shadow-2xl hover:shadow-white/30 overflow-hidden"
                                        >
                                            {/* Ripple effect */}
                                            <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-700 ease-out"></div>
                                            
                                            <span className="relative mr-3 z-10">Start Learning</span>
                                            <svg className="relative w-6 h-6 transform group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-500 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Enhanced Navigation with Progress Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentBanner(index)}
                            className={`group relative transition-all duration-500 hover:scale-125 ${
                                index === currentBanner ? 'scale-125' : ''
                            }`}
                        >
                            <div className={`w-5 h-5 rounded-full transition-all duration-500 ${
                                index === currentBanner 
                                    ? 'bg-white shadow-lg shadow-white/50' 
                                    : 'bg-white/40 hover:bg-white/70 backdrop-blur-sm'
                            }`}></div>
                            
                            {/* Progress ring */}
                            {index === currentBanner && (
                                <div className="absolute inset-0 rounded-full border-2 border-white/50">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 24 24">
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="white"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray={63}
                                            strokeDashoffset={63}
                                            className="animate-progress-ring"
                                        />
                                    </svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Categories with 3D Transform Effects */}
                <div className="mb-24" data-section="categories">
                    <div className="text-center mb-20">
                        <div className="relative inline-block mb-6">
                            <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-text leading-tight">
                                Explore Categories
                            </h2>
                            {/* Animated underline */}
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-underline-grow"></div>
                                <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-dot-bounce"></div>
                                <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-underline-grow animation-delay-500"></div>
                            </div>
                        </div>
                        <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
                            Discover diverse learning paths designed by industry experts to accelerate your career growth
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {categories.map((category, index) => (
                            <Link
                                key={category.name}
                                to={`/category/${category.name.toLowerCase()}`}
                                className={`group relative transform-gpu perspective-1000 ${
                                    isVisible.categories ? 'animate-category-3d' : 'opacity-0 translate-y-12'
                                }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative bg-white rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-4 hover:rotateX-5 transition-all duration-700 border border-gray-100 hover:border-blue-200 overflow-hidden group-hover:scale-105">
                                    {/* Animated background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    
                                    {/* Morphing shapes */}
                                    <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full transform group-hover:scale-150 group-hover:rotate-180 transition-all duration-1000"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="text-5xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 filter group-hover:drop-shadow-2xl">
                                            {category.icon}
                                        </div>
                                        <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-500 text-lg mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                                            {category.count} courses
                                        </p>
                                        
                                        {/* Progress indicator */}
                                        <div className="mt-4 w-full bg-gray-200 rounded-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
                                        </div>
                                    </div>

                                    {/* Sparkle effects */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-sparkle-complex"
                                                style={{
                                                    left: `${20 + i * 15}%`,
                                                    top: `${20 + i * 15}%`,
                                                    animationDelay: `${i * 0.2}s`
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Rest of your existing code with the enhanced animations... */}
            </div>

            {/* Enhanced CSS Animations */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                
                @keyframes float-complex {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); 
                        opacity: 0.7;
                    }
                    25% { 
                        transform: translateY(-20px) translateX(10px) rotate(90deg) scale(1.1); 
                        opacity: 1;
                    }
                    50% { 
                        transform: translateY(-10px) translateX(-15px) rotate(180deg) scale(0.9); 
                        opacity: 0.8;
                    }
                    75% { 
                        transform: translateY(-30px) translateX(5px) rotate(270deg) scale(1.05); 
                        opacity: 0.9;
                    }
                }
                
                @keyframes word-reveal {
                    0% { 
                        opacity: 0; 
                        transform: translateY(50px) rotateX(90deg); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0) rotateX(0deg); 
                    }
                }
                
                @keyframes category-3d {
                    0% { 
                        opacity: 0; 
                        transform: translateY(60px) rotateX(45deg) scale(0.8); 
                    }
                    50% { 
                        opacity: 0.7; 
                        transform: translateY(-10px) rotateX(-5deg) scale(1.05); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0) rotateX(0deg) scale(1); 
                    }
                }
                
                @keyframes sparkle-complex {
                    0%, 100% { 
                        opacity: 0; 
                        transform: scale(0) rotate(0deg); 
                    }
                    25% { 
                        opacity: 1; 
                        transform: scale(1.5) rotate(90deg); 
                    }
                    50% { 
                        opacity: 0.8; 
                        transform: scale(1) rotate(180deg); 
                    }
                    75% { 
                        opacity: 1; 
                        transform: scale(1.2) rotate(270deg); 
                    }
                }
                
                @keyframes progress-ring {
                    0% { stroke-dashoffset: 63; }
                    100% { stroke-dashoffset: 0; }
                }
                
                @keyframes underline-grow {
                    0% { width: 0; }
                    100% { width: 2rem; }
                }
                
                @keyframes dot-bounce {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-8px) scale(1.2); }
                }

                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .animation-delay-500 { animation-delay: 0.5s; }
                
                .animate-float-complex { animation: float-complex 8s ease-in-out infinite; }
                .animate-word-reveal { animation: word-reveal 1s ease-out both; }
                .animate-category-3d { animation: category-3d 1s ease-out both; }
                .animate-sparkle-complex { animation: sparkle-complex 2s ease-in-out infinite; }
                .animate-progress-ring { animation: progress-ring 6s linear infinite; }
                .animate-underline-grow { animation: underline-grow 1s ease-out both; }
                .animate-dot-bounce { animation: dot-bounce 2s ease-in-out infinite; }
                
                .perspective-1000 { perspective: 1000px; }
                .transform-gpu { transform: translateZ(0); }
            `}</style>
        </div>
    );
}

export default Home;
