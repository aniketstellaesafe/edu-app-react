// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Sample banner data
  const banners = [
    {
      id: 1,
      title: "Master React Development",
      subtitle: "From Beginner to Expert",
      description: "Learn React.js with hands-on projects and real-world applications",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      gradient: "from-blue-600 to-purple-600",
      link: "/courses/react"
    },
    {
      id: 2,
      title: "Python for Data Science",
      subtitle: "Analytics & Machine Learning",
      description: "Dive deep into data analysis with Python, NumPy, and Pandas",
      image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&h=400&fit=crop",
      gradient: "from-green-500 to-teal-600",
      link: "/courses/python"
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      subtitle: "MERN Stack Complete Course",
      description: "Build modern web applications with MongoDB, Express, React & Node.js",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
      gradient: "from-orange-500 to-red-500",
      link: "/courses/fullstack"
    }
  ];

  // Sample courses data
  const featuredCourses = [
    {
      id: 1,
      title: "Complete JavaScript Masterclass",
      instructor: "John Smith",
      rating: 4.8,
      students: 12547,
      price: "₹2,999",
      originalPrice: "₹4,999",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop",
      duration: "40 hours",
      level: "Beginner to Advanced",
      category: "Programming"
    },
    {
      id: 2,
      title: "React Native Mobile Development",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 8392,
      price: "₹3,499",
      originalPrice: "₹5,499",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
      duration: "35 hours",
      level: "Intermediate",
      category: "Mobile Development"
    },
    {
      id: 3,
      title: "Machine Learning with Python",
      instructor: "Dr. Michael Chen",
      rating: 4.7,
      students: 15623,
      price: "₹4,199",
      originalPrice: "₹6,199",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
      duration: "50 hours",
      level: "Advanced",
      category: "Data Science"
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      instructor: "Emma Wilson",
      rating: 4.6,
      students: 9847,
      price: "₹2,799",
      originalPrice: "₹4,299",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=200&fit=crop",
      duration: "25 hours",
      level: "Beginner",
      category: "Design"
    },
    {
      id: 5,
      title: "Cloud Computing with AWS",
      instructor: "Robert Davis",
      rating: 4.8,
      students: 11234,
      price: "₹3,999",
      originalPrice: "₹5,999",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop",
      duration: "45 hours",
      level: "Intermediate",
      category: "Cloud Computing"
    },
    {
      id: 6,
      title: "Digital Marketing Mastery",
      instructor: "Lisa Thompson",
      rating: 4.5,
      students: 7658,
      price: "₹2,599",
      originalPrice: "₹3,999",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      duration: "30 hours",
      level: "Beginner",
      category: "Marketing"
    }
  ];

  const categories = [
    { name: "Programming", icon: "💻", count: 45 },
    { name: "Design", icon: "🎨", count: 32 },
    { name: "Business", icon: "📊", count: 28 },
    { name: "Data Science", icon: "📈", count: 24 },
    { name: "Marketing", icon: "📱", count: 19 },
    { name: "Photography", icon: "📸", count: 15 }
  ];

  // Auto-rotate banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const CourseCard = ({ course, index }) => (
    <div 
      className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
        isVisible[`course-${index}`] ? 'animate-fadeInUp' : 'opacity-0'
      }`}
      data-animate
      id={`course-${index}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800">
            {course.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {Math.round(((course.originalPrice.replace('₹', '') - course.price.replace('₹', '')) / course.originalPrice.replace('₹', '')) * 100)}% OFF
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.level}
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-gray-500 text-sm">({course.students.toLocaleString()})</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3">By {course.instructor}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>🕒 {course.duration}</span>
          <span>👥 {course.students.toLocaleString()} students</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">{course.price}</span>
            <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
          </div>
          <Link
            to={`/course/${course.id}`}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );

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
        <div className="mb-16" data-animate id="categories">
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16" data-animate id="stats">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center ${
            isVisible.stats ? 'animate-fadeInUp' : 'opacity-0'
          }`}>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Online Courses</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">4.8★</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

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