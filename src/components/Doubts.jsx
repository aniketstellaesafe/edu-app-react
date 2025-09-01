import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../utils/useAuth';

export default function Doubts() {
  const user = useAuth();
  const [qText, setQText] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'doubts'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const post = async () => {
    if (!user) return alert('Please login first to ask a doubt.');
    if (!qText.trim()) return;

    setLoading(true);
    await addDoc(collection(db, 'doubts'), {
      userId: user.uid,
      userEmail: user.email,
      question: qText.trim(),
      answer: '',
      createdAt: serverTimestamp(),
    });
    setQText('');
    setLoading(false);
  };

  return (
    <div className="grid gap-4">
      <div className="bg-white rounded-xl p-4 shadow">
        <h3 className="font-semibold mb-2">Ask a Doubt</h3>
        <textarea
          value={qText}
          onChange={(e) => setQText(e.target.value)}
          className="w-full border rounded p-2"
          rows={3}
          placeholder="Type your question..."
        />
        <button onClick={post} disabled={loading} className="mt-2 px-3 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400">
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-xl">Recent Doubts</h3>
        {items.map(d => (
          <div key={d.id} className="bg-white rounded-xl p-4 shadow">
            <div className="font-medium">{d.question}</div>
            <div className="text-xs text-gray-500 mt-1">Asked by: {d.userEmail || 'Anonymous'}</div>
            <div className="mt-2 text-sm text-gray-700 border-l-4 pl-3">
              {d.answer ? d.answer : <span className="text-gray-500 italic">- No answer yet -</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}