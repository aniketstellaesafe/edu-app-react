import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link ko import karein
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Naya user banane ka function

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Naya user banane ka function
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Firebase ko naya user create karne ke liye bolein
      await createUserWithEmailAndPassword(auth, email, password);
      // Signup ke baad, user automatically login ho jaata hai, to use homepage par bhej do
      navigate('/');
    } catch (err) {
      // Common errors: "email-already-in-use", "weak-password"
      setError(err.message);
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create your EduApp Account</h2>
        <form onSubmit={handleSignup}>
          {/* Email aur Password ke fields */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Create a strong password"
              required
            />
             <p className="text-xs text-gray-600">Password should be at least 6 characters.</p>
          </div>

          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Sign Up
            </button>
          </div>

          {/* Waapas Login page par jaane ka link */}
          <p className="text-center text-gray-500 text-xs mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-500 hover:text-blue-800">
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;