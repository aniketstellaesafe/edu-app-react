import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

async function createUserDoc(user) {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: user.displayName || "",
      phone: "",
      dob: "",
      gender: "",
      photoURL: user.photoURL || "",
      isPremium: false,
      streakCount: 0,
      lastActiveDate: "",
      xp: 0,
      badges: [],
      coursesEnrolled: 0,
      coursesCompleted: 0,
      createdAt: serverTimestamp(),
    });
  }
}
