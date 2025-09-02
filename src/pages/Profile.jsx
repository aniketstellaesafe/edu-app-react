import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { User, Crown, Settings, HelpCircle, LogOut } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

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
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* User Info Card */}
        <div className="bg-white shadow rounded-2xl p-6 flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold">
            {user.email[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.displayName || "User"}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-400">UID: {user.uid}</p>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Settings */}
          <div className="bg-white shadow rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Settings className="w-5 h-5 text-indigo-600" />
              <span>Account Settings</span>
            </h3>
            <button className="w-full py-2 px-3 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">
              Edit Profile
            </button>
            <button className="w-full py-2 px-3 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">
              Change Password
            </button>
            <button className="w-full py-2 px-3 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">
              Notification Settings
            </button>
          </div>

          {/* Subscription */}
          <div className="bg-white shadow rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span>Subscription</span>
            </h3>
            {isPremium ? (
              <p className="text-green-600 font-medium">✅ Premium Member</p>
            ) : (
              <>
                <p className="text-red-500 font-medium">❌ Free Account</p>
                <button className="w-full py-2 px-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
                  Upgrade to Premium
                </button>
              </>
            )}
          </div>

          {/* Progress / Courses */}
          <div className="bg-white shadow rounded-2xl p-6 space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <span>Your Courses</span>
            </h3>
            <p className="text-gray-600">Coming soon: Your enrolled courses will appear here.</p>
          </div>

          {/* Support */}
          <div className="bg-white shadow rounded-2xl p-6 space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-purple-500" />
              <span>Support</span>
            </h3>
            <button className="w-full py-2 px-3 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">
              Help Center
            </button>
            <button className="w-full py-2 px-3 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">
              Contact Support
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="bg-white shadow rounded-2xl p-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
