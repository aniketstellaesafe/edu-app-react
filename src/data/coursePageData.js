// src/data/coursePageData.js

export const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'curriculum', label: 'Curriculum', icon: '📚' },
    { id: 'instructor', label: 'Instructor', icon: '👨‍🏫' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' }
];

export const mockCurriculum = [
    { title: 'Introduction to the Course', duration: '15 min', locked: false },
    { title: 'Getting Started', duration: '25 min', locked: false },
    { title: 'Core Concepts', duration: '45 min', locked: true },
    { title: 'Advanced Techniques', duration: '60 min', locked: true },
    { title: 'Final Project', duration: '90 min', locked: true }
];

export const mockReviews = [
    { name: 'Rahul Sharma', rating: 5, comment: 'Excellent course! Very detailed and well-explained.', date: '2 days ago' },
    { name: 'Priya Patel', rating: 4, comment: 'Great content, but could use more practical examples.', date: '1 week ago' },
    { name: 'Amit Kumar', rating: 5, comment: 'Best investment I made for my career!', date: '2 weeks ago' }
];