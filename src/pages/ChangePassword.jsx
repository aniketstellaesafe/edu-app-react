// src/pages/ChangePassword.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const user = auth.currentUser;
    if (!user) {
      setError("No user is signed in.");
      setIsLoading(false);
      return;
    }

    // New check added here to prevent new and current passwords from being the same
    if (newPassword === currentPassword) {
      setError("New password cannot be the same as the current password.");
      setIsLoading(false);
      return;
    }
    
    // Re-authenticate user before changing password for security
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert("Password updated successfully!");
      navigate('/profile');
    } catch (err) {
      console.error("Error changing password:", err);
      if (err.code === 'auth/wrong-password') {
        setError("The current password you entered is incorrect.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak. Please use a stronger password.");
      } else {
        setError("Failed to update password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <form onSubmit={handlePasswordChange} className="p-8 bg-white/10 rounded-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 py-3 rounded hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-500"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;