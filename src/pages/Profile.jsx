import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { User, Crown, Settings, HelpCircle, LogOut, Edit, Key, Bell, BookOpen, MessageCircle } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 3 + 2,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Firestore se premium status fetch
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setIsPremium(!!userDoc.data()?.isPremium);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
        
        {/* Moving Grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'moveGrid 25s linear infinite'
          }}
        ></div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.speed + 4}s`,
              animationDelay: `${particle.id * 0.1}s`,
            }}
          ></div>
        ))}

        {/* Glowing Orbs */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header with User Info */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl animate-slideUp">
            <div className="flex items-center space-x-6">
              {/* Avatar with glow effect */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-2xl animate-glow">
                  {user.email[0].toUpperCase()}
                </div>
                <div className="absolute -inset-2 rounded-full border-2 border-cyan-400/30 animate-spin-slow"></div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-gradient">
                  {user.displayName || "Welcome User"}
                </h1>
                <p className="text-gray-300 text-lg mb-2">{user.email}</p>
                <p className="text-gray-400 text-sm font-mono">ID: {user.uid.substring(0, 8)}...</p>
                
                {/* Premium Badge */}
                {isPremium && (
                  <div className="inline-flex items-center space-x-2 mt-3 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full border border-yellow-400/50">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-300 font-medium">Premium Member</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Account Settings Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Account Settings</h3>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/profile/edit')}
                  className="w-full flex items-center space-x-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105 group/btn"
                >
                  <Edit className="w-5 h-5 text-purple-400 group-hover/btn:scale-110 transition-transform" />
                  <span>Edit Profile</span>
                </button>
                <button 
                  onClick={() => navigate('/profile/change-password')}
                  className="w-full flex items-center space-x-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105 group/btn"
                >
                  <Key className="w-5 h-5 text-green-400 group-hover/btn:scale-110 transition-transform" />
                  <span>Change Password</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105 group/btn">
                  <Bell className="w-5 h-5 text-yellow-400 group-hover/btn:scale-110 transition-transform" />
                  <span>Notifications</span>
                </button>
              </div>
            </div>

            {/* Subscription Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                  <Crown className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Subscription</h3>
              </div>
              
              {isPremium ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/50">
                    <p className="text-green-300 font-semibold flex items-center space-x-2">
                      <span className="text-2xl">✨</span>
                      <span>Premium Active</span>
                    </p>
                    <p className="text-gray-300 text-sm mt-2">Enjoy unlimited access to all features</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl border border-red-400/50">
                    <p className="text-red-300 font-semibold flex items-center space-x-2">
                      <span className="text-2xl">⚡</span>
                      <span>Free Account</span>
                    </p>
                    <p className="text-gray-300 text-sm mt-2">Limited access to features</p>
                  </div>
                  <button 
                    onClick={() => navigate('/upgrade')}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 rounded-xl hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
                  >
                    Upgrade to Premium 🚀
                  </button>
                </div>
              )}
            </div>

            {/* Your Courses Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Your Courses</h3>
              </div>
              
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-gray-300 mb-4">No courses enrolled yet</p>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300">
                  Browse Courses
                </button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl">
                <HelpCircle className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Support & Help</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <button className="flex items-center space-x-4 p-6 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all duration-300 hover:scale-105 group">
                <div className="p-2 bg-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold">Help Center</h4>
                  <p className="text-sm text-gray-400">Find answers to common questions</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-4 p-6 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all duration-300 hover:scale-105 group">
                <div className="p-2 bg-green-500/20 rounded-xl group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold">Contact Support</h4>
                  <p className="text-sm text-gray-400">Get help from our team</p>
                </div>
              </button>
            </div>
          </div>

          {/* Logout Section */}
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-bold hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-400/25 disabled:opacity-70 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2); 
          }
          50% { 
            box-shadow: 0 0 30px rgba(34, 211, 238, 0.8), 0 0 50px rgba(168, 85, 247, 0.4); 
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default Profile;