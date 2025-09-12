// src/pages/EditProfile.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  // Get the current user's display name, or an empty string if it doesn't exist.
  const currentUser = auth.currentUser;
  const initialDisplayName = currentUser?.displayName || '';
  
  const [newDisplayName, setNewDisplayName] = useState(initialDisplayName);
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (currentUser) {
      try {
        await updateProfile(currentUser, {
          displayName: newDisplayName,
        });
        alert('Profile updated successfully!');
        navigate('/profile');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <form onSubmit={handleUpdateProfile} className="p-8 bg-white/10 rounded-2xl">
        <h2 className="text-2xl mb-4">Edit Profile</h2>
        <input
          type="text"
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
          placeholder="New Display Name"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <button type="submit" className="w-full bg-blue-500 py-3 rounded hover:bg-blue-600">Update</button>
      </form>
    </div>
  );
}

export default EditProfile;