import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import useAuth from '../utils/useAuth';
import { db } from '../firebase';
import PremiumButton from './PremiumButton.jsx';

export default function Courses() {
  const user = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setIsPremium(!!userDoc.data()?.isPremium);
      } else {
        setIsPremium(false);
      }
      const coursesSnapshot = await getDocs(collection(db, 'courses'));
      setCourses(coursesSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  const visibleCourses = courses.filter(c => c.isFree || isPremium);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Courses</h2>
        {user && !isPremium && <PremiumButton />}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {visibleCourses.map(c => (
          <div key={c.id} className="bg-white rounded-xl shadow p-4 space-y-2">
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.description}</p>
            {c.videoURL ? (
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded"
                  src={c.videoURL}
                  title={c.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : <div className="aspect-video bg-gray-200 rounded flex items-center justify-center"><p>No video</p></div>}
          </div>
        ))}
         {courses.filter(c => !c.isFree && !isPremium).map(c => (
             <div key={c.id} className="relative bg-white rounded-xl shadow p-4 blur-sm select-none">
                 <h3 className="font-semibold text-lg">{c.title}</h3>
                 <p className="text-sm text-gray-600">{c.description}</p>
                 <div className="mt-3 aspect-video bg-gray-300 rounded"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs font-bold text-orange-600 bg-white/70 px-2 py-1 rounded">
                        Premium content. Buy premium to unlock.
                    </p>
                </div>
             </div>
         ))}
      </div>
    </div>
  );
}