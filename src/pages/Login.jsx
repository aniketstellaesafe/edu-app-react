import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    setTimeout(async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (err) {
        setError("Invalid email or password");
      } finally {
        setIsLoading(false);
      }
    }, 1500);
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
    <div className="min-h-screen max-h-screen overflow-hidden flex items-center justify-center relative px-4 py-6">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Moving Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(cyan 1px, transparent 1px),
              linear-gradient(90deg, cyan 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'moveGrid 20s linear infinite'
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-300 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.speed + 3}s`,
              animationDelay: `${particle.id * 0.1}s`,
            }}
          />
        ))}

        {/* Glowing Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-bounce" />
      </div>

      {/* Main Container - Compact Design */}
      <div className="relative w-full max-w-sm mx-auto">
        {/* Panda Head - Positioned at top of form */}
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24 bg-white rounded-full border-4 border-cyan-400 flex items-center justify-center shadow-lg animate-bounce">
            {/* Holographic Ring */}
            <div className="absolute -inset-1 rounded-full border border-cyan-300/50 animate-spin-slow" />
            
            {/* Ears */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-black rounded-full" />
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-black rounded-full" />
            
            {/* Eyes */}
            <div className="absolute left-4 top-6 w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <div
                className={`w-2 h-2 bg-cyan-400 rounded-full transition-all duration-500 ${
                  coverEyes ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
            </div>
            <div className="absolute right-4 top-6 w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <div
                className={`w-2 h-2 bg-cyan-400 rounded-full transition-all duration-500 ${
                  coverEyes ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
            </div>
            
            {/* Nose */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-3 bg-black rounded-b-full" />
            
            {/* Hands */}
            <div
              className={`absolute -left-1 top-10 w-7 h-7 bg-black rounded-full transition-all duration-700 ${
                coverEyes ? "-translate-y-4 translate-x-3 scale-110" : ""
              }`}
            />
            <div
              className={`absolute -right-1 top-10 w-7 h-7 bg-black rounded-full transition-all duration-700 ${
                coverEyes ? "-translate-y-4 -translate-x-3 scale-110" : ""
              }`}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome Back! 🐼
            </h2>
            <p className="text-gray-300 text-sm">
              Login to your EduApp account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onFocus={() => setCoverEyes(true)}
                onBlur={() => setCoverEyes(false)}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Error / Success Messages */}
            {error && (
              <div className="bg-red-500/20 border border-red-400 rounded-lg p-3">
                <p className="text-red-200 text-sm text-center">{error}</p>
              </div>
            )}
            {resetMsg && (
              <div className="bg-green-500/20 border border-green-400 rounded-lg p-3">
                <p className="text-green-200 text-sm text-center">{resetMsg}</p>
              </div>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgot}
                className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:scale-100 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <span>🚀</span>
                </>
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm mb-2">
              Don't have an account?
            </p>
            <Link
              to="/signup"
              className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors text-lg"
            >
              Sign Up Now ✨
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
}
