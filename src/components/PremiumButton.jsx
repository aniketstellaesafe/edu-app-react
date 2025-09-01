import useAuth from '../utils/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function PremiumButton() {
  const user = useAuth();
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const buy = async () => {
    if (!user) return alert('Please login first to buy premium.');

    const options = {
      key: keyId,
      amount: 9900,
      currency: 'INR',
      name: 'EduApp Premium',
      description: 'Unlock all premium courses',
      handler: async function (response) {
        await updateDoc(doc(db, 'users', user.uid), { isPremium: true });
        alert('Payment successful! Premium unlocked. Please refresh the page.');
        window.location.reload();
      },
      prefill: {
        email: user.email || '',
      },
      theme: {
        color: '#0f172a',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={buy} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
      Buy Premium
    </button>
  );
}