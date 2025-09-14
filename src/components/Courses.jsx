// import { useEffect, useState } from "react";
// import { collection, getDocs, doc, getDoc } from "firebase/firestore";
// import useAuth from "../utils/useAuth";
// import { db } from "../firebase";
// import PremiumButton from "./PremiumButton.jsx";
// import { Lock } from "lucide-react";

// export default function Courses() {
//   const user = useAuth();
//   const [isPremium, setIsPremium] = useState(false);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all"); // all | free | premium

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       if (user) {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         setIsPremium(!!userDoc.data()?.isPremium);
//       } else {
//         setIsPremium(false);
//       }
//       const coursesSnapshot = await getDocs(collection(db, "courses"));
//       setCourses(coursesSnapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
//       setLoading(false);
//     };
//     fetchData();
//   }, [user]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-xl text-gray-600">
//         Loading courses...
//       </div>
//     );
//   }

//   // Filtering
//   let filteredCourses = courses;
//   if (filter === "free") {
//     filteredCourses = courses.filter((c) => c.isFree);
//   } else if (filter === "premium") {
//     filteredCourses = courses.filter((c) => !c.isFree);
//   }

//   return (
//     <div className="space-y-8">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-10 shadow-lg">
//         <h1 className="text-4xl font-extrabold mb-2">Welcome to EduApp 🚀</h1>
//         <p className="text-lg opacity-90">
//           Unlock knowledge with our premium curated courses.
//         </p>
//       </div>

//       {/* Header + Premium Button */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
//           📚 Explore Our Courses
//         </h2>
//         {user && !isPremium && <PremiumButton />}
//       </div>

//       {/* Filter Tabs */}
//       <div className="flex space-x-4 border-b">
//         {["all", "free", "premium"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setFilter(tab)}
//             className={`pb-2 px-4 text-sm font-semibold ${
//               filter === tab
//                 ? "border-b-2 border-indigo-600 text-indigo-600"
//                 : "text-gray-500 hover:text-indigo-600"
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Courses Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredCourses.map((c) => {
//           const locked = !c.isFree && !isPremium;

//           return (
//             <div
//               key={c.id}
//               className="relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border border-gray-200"
//             >
//               {/* Video Player */}
//               <div className="aspect-video bg-black">
//                 {!locked ? (
//                   <video
//                     className="w-full h-full object-cover"
//                     src={c.videoURL}
//                     controls
//                     preload="metadata"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-300"></div>
//                 )}
//               </div>

//               {/* Content */}
//               <div className={`p-4 space-y-2 ${locked ? "blur-sm select-none" : ""}`}>
//                 <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
//                   {c.title}
//                 </h3>
//                 <p className="text-sm text-gray-600">{c.description}</p>
//               </div>

//               {/* Premium Overlay */}
//               {locked && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm text-white">
//                   <Lock className="w-8 h-8 mb-2" />
//                   <p className="text-sm font-semibold bg-white/80 text-orange-600 px-3 py-1 rounded">
//                     Premium content — Buy Premium to unlock
//                   </p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
