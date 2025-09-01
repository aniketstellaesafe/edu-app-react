import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Jasoosi shuru...
  console.log("1. ProtectedRoute component render ho raha hai.");

  useEffect(() => {
    console.log("2. useEffect chala, Firebase se user ka status pucha ja raha hai...");
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Yeh message batayega ki Firebase ne kya jawab diya
      console.log("3. Firebase se jawab aaya. User hai:", currentUser);
      
      setUser(currentUser);
      setLoading(false); // Jaise hi jawab aaye, loading band
    });

    return () => unsubscribe();
  }, []);

  // Check poora hone se pehle...
  if (loading) {
    console.log("4. Abhi loading state me hai, isliye 'Loading...' dikha rahe hain.");
    return <div>Loading...</div>;
  }
  
  // Check poora hone ke baad...
  if (user) {
    console.log("5. User hai, isliye aage Courses page par jaane de rahe hain.");
    return <Outlet />;
  } else {
    console.log("6. User nahi hai, isliye Login page par bhej rahe hain.");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;