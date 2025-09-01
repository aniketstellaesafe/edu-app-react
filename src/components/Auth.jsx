import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!email || !pass) {
        alert('Please enter email and password.');
        return;
    }
    try {
      setLoading(true);
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, pass);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        await setDoc(doc(db, 'users', cred.user.uid), {
          email,
          isPremium: false,
          createdAt: Date.now(),
        });
      }
      navigate('/');
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Create Account'}</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        className="w-full border p-2 rounded mb-2"
      />
      <input
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="Password"
        type="password"
        className="w-full border p-2 rounded mb-4"
      />
      <button disabled={loading} onClick={submit} className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400">
        {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Signup'}
      </button>
      <p className="text-sm mt-3 text-center">
        {mode === 'login' ? 'No account?' : 'Already have an account?'}
        <button
          className="underline ml-1"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        >
          {mode === 'login' ? 'Signup' : 'Login'}
        </button>
      </p>
    </div>
  );
}