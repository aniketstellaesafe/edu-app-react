import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-blue-600 px-4 pt-32">
      {/* 👆 yahan pt-32 diya hai taki upar bhi free space ho */}
      
      <div className="relative bg-white rounded-3xl shadow-xl p-8 pt-32 w-full max-w-md overflow-visible animate-fadeUp">
        
        {/* Panda Character */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2">
          <div className="relative w-36 h-36 mx-auto">
            {/* Head */}
            <div className="w-36 h-36 bg-white rounded-full border-4 border-black relative">
              {/* Ears */}
              <div className="absolute -top-4 left-4 w-10 h-10 bg-black rounded-full"></div>
              <div className="absolute -top-4 right-4 w-10 h-10 bg-black rounded-full"></div>
              {/* Eyes */}
              <div className="absolute top-12 left-9 w-6 h-6 bg-black rounded-full"></div>
              <div className="absolute top-12 right-9 w-6 h-6 bg-black rounded-full"></div>
              {/* Nose */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>
            </div>

            {/* Hands */}
            <div
              className={`absolute top-10 -left-8 w-16 h-16 bg-black rounded-full transition-all duration-500 ${
                isPasswordFocus ? "translate-x-10 translate-y-6 rotate-45" : ""
              }`}
            ></div>
            <div
              className={`absolute top-10 -right-8 w-16 h-16 bg-black rounded-full transition-all duration-500 ${
                isPasswordFocus ? "-translate-x-10 translate-y-6 -rotate-45" : ""
              }`}
            ></div>
          </div>
        </div>

        {/* Signup Form */}
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create your EduApp account
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocus(true)}
              onBlur={() => setIsPasswordFocus(false)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-xs italic text-center">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
