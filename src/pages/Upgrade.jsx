import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth } from '../firebase';

function Upgrade() {
  const [giftCardCode, setGiftCardCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Initialize Firebase Functions
  const functions = getFunctions();
  const submitGiftCard = httpsCallable(functions, 'submitGiftCard');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const userEmail = auth.currentUser?.email;
    if (!userEmail) {
      setMessage("You must be logged in to submit a request.");
      setIsLoading(false);
      return;
    }

    if (!giftCardCode) {
      setMessage("Please enter the gift card code.");
      setIsLoading(false);
      return;
    }

    try {
      // Call the cloud function instead of writing directly to Firestore
      await submitGiftCard({
        giftCardCode: giftCardCode,
        userEmail: userEmail,
      });

      setMessage("Your request has been submitted! We will verify the code and upgrade your account within 1-10 minutes.");
      setGiftCardCode('');
    } catch (error) {
      console.error("Error submitting gift card:", error);
      setMessage("Failed to submit your request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <div className="p-8 bg-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-slideUp">
        <h2 className="text-3xl font-bold mb-4 text-center text-yellow-300">Upgrade to Premium 👑</h2>
        <p className="text-gray-300 mb-6 text-center">
          To become a premium member, follow these steps:
        </p>

        <ol className="list-decimal list-inside space-y-3 text-gray-200 mb-6">
          <li>
            **Purchase an Amazon gift card.**
            <br />
            <a 
              href="https://www.amazon.in/Amazon-Pay-E-Gift-Card-Gift-Card/dp/B0B58R919Y" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:underline"
            >
              Click here to buy an Amazon gift card
            </a>
          </li>
          <li>
            **Send the gift card to our email.**
            <br />
            Email: <span className="font-bold text-yellow-300">help.classwave@gmail.com</span>
          </li>
          <li>
            **Submit the gift card code below.** Once submitted and verified, we will upgrade your account within 1-10 minutes.
          </li>
        </ol>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={giftCardCode}
            onChange={(e) => setGiftCardCode(e.target.value)}
            placeholder="Enter Gift Card Code"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-600 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Submit Gift Card"}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm text-center ${message.includes("submitted") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Upgrade;