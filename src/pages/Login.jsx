import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetMsg, setResetMsg] = useState(null);
  const [coverEyes, setCoverEyes] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleForgot = async () => {
    if (!email) {
      setError("Enter your email to reset password");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMsg("Password reset email sent!");
    } catch (err) {
      setError("Unable to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 backdrop-blur-sm px-4 pt-32">
      {/* 👆 Blue gradient background + blur, pt-32 for extra space */}
      
      <div className="relative bg-white rounded-3xl shadow-xl p-8 pt-32 w-full max-w-md overflow-visible animate-fadeUp">
        {/* 🐼 Panda Head */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2">
          <div className="relative w-32 h-32 bg-white rounded-full border-4 border-black flex items-center justify-center">
            {/* Ears */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-black rounded-full"></div>
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-black rounded-full"></div>
            {/* Eyes */}
            <div className="absolute left-6 top-10 w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div
                className={`w-3 h-3 bg-white rounded-full transition-all duration-300 ${
                  coverEyes ? "opacity-0" : "opacity-100"
                }`}
              ></div>
            </div>
            <div className="absolute right-6 top-10 w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div
                className={`w-3 h-3 bg-white rounded-full transition-all duration-300 ${
                  coverEyes ? "opacity-0" : "opacity-100"
                }`}
              ></div>
            </div>
            {/* Nose */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-4 bg-black rounded-b-full"></div>
            {/* Hands */}
            <div
              className={`absolute left-0 top-14 w-10 h-10 bg-black rounded-full transition-transform duration-300 ${
                coverEyes ? "translate-y-[-25px] translate-x-[20px]" : ""
              }`}
            ></div>
            <div
              className={`absolute right-0 top-14 w-10 h-10 bg-black rounded-full transition-transform duration-300 ${
                coverEyes ? "translate-y-[-25px] translate-x-[-20px]" : ""
              }`}
            ></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mt-6">Welcome Back 🐼</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to your EduApp account
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
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
              onFocus={() => setCoverEyes(true)}
              onBlur={() => setCoverEyes(false)}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Error / Reset Msg */}
          {error && (
            <p className="text-red-500 text-xs italic text-center">{error}</p>
          )}
          {resetMsg && (
            <p className="text-green-500 text-xs italic text-center">
              {resetMsg}
            </p>
          )}

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgot}
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
