import useAuth from '../utils/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

export default function Profile() {
  const user = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setIsPremium(!!userDoc.data()?.isPremium);
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  if (loading) return <div>Loading profile...</div>

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">Please login to see your profile.</div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold mb-2">Profile</h3>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
      <p><span className="font-semibold">Status:</span>
        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${isPremium ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
            {isPremium ? 'Premium' : 'Free'}
        </span>
      </p>
    </div>
  );
}