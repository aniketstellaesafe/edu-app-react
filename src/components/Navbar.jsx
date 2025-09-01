import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import useAuth from '../utils/useAuth';

export default function Navbar() {
  const user = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="font-extrabold text-xl">EduApp</div>
        <nav className="flex-1 flex gap-4">
          <NavLink to="/" className={({ isActive }) => `hover:underline ${isActive ? 'font-semibold' : ''}`}>Courses</NavLink>
          <NavLink to="/doubts" className={({ isActive }) => `hover:underline ${isActive ? 'font-semibold' : ''}`}>Doubts</NavLink>
          <NavLink to="/profile" className={({ isActive }) => `hover:underline ${isActive ? 'font-semibold' : ''}`}>Profile</NavLink>
        </nav>
        {user ? (
          <button
            onClick={async () => {
              await signOut(auth);
              navigate('/auth');
            }}
            className="px-3 py-1.5 rounded-lg bg-gray-900 text-white"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/auth" className="px-3 py-1.5 rounded-lg bg-gray-900 text-white">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}