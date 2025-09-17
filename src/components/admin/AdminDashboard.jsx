// src/components/admin/AdminDashboard.jsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CourseService from '../../services/courseService';

function AdminDashboard() {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Check admin access
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-8xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-8">You don't have admin privileges to access this area.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isAddCoursePage = location.pathname.includes('/admin/add-course');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🎛️ Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, <span className="font-semibold text-blue-600">{currentUser.name}</span>! 
                Manage your courses and website content.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last login</div>
              <div className="font-semibold">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Admin Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <Link
                to="/admin"
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  location.pathname === '/admin'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📊 Overview
              </Link>
              <Link
                to="/admin/add-course"
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isAddCoursePage
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ➕ Add Course
              </Link>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        {location.pathname === '/admin' ? (
          <AdminOverview />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

// Admin Overview Component
function AdminOverview() {
  const allCourses = CourseService.getAllCourses();
  const dynamicCourses = JSON.parse(localStorage.getItem('courses') || '[]');
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const stats = [
    {
      name: 'Total Courses',
      value: allCourses.length,
      icon: '📚',
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      name: 'Total Users', 
      value: users.length,
      icon: '👥',
      color: 'bg-green-500',
      change: '+5 this week'
    },
    {
      name: 'Custom Courses',
      value: dynamicCourses.length,
      icon: '⚡',
      color: 'bg-purple-500',
      change: 'Recently added'
    },
    {
      name: 'Categories',
      value: [...new Set(allCourses.map(c => c.category))].length,
      icon: '🎯',
      color: 'bg-orange-500',
      change: 'Active now'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} rounded-lg p-3`}>
                <span className="text-2xl text-white">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          ⚡ Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/add-course"
            className="group flex items-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 group-hover:bg-blue-200 rounded-lg p-3 mr-4 transition-colors">
                <span className="text-2xl">➕</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-700">Add New Course</p>
                <p className="text-sm text-gray-600">Create engaging content</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/courses"
            className="group flex items-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-300"
          >
            <div className="flex items-center">
              <div className="bg-green-100 group-hover:bg-green-200 rounded-lg p-3 mr-4 transition-colors">
                <span className="text-2xl">👁️</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-green-700">View All Courses</p>
                <p className="text-sm text-gray-600">See public course list</p>
              </div>
            </div>
          </Link>

          <div className="group flex items-center p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-not-allowed opacity-60">
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-lg p-3 mr-4">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Analytics</p>
                <p className="text-sm text-gray-500">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          📈 Recent Activity
        </h3>
        <div className="space-y-4">
          {dynamicCourses.slice(-5).map((course, index) => (
            <div key={course.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 rounded-lg p-2 mr-4">
                <span className="text-lg">📚</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{course.title}</p>
                <p className="text-sm text-gray-600">Added by {course.instructor}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(course.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          
          {dynamicCourses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-2 block">📝</span>
              No custom courses added yet. Start by adding your first course!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
