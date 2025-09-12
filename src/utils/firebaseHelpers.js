// src/utils/firebaseHelpers.js
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { db, storage, auth } from "../firebase";

// 1) create user doc if not exists
export async function createUserDocIfNotExists(user) {
  if (!user) return;
  const uRef = doc(db, "users", user.uid);
  const snap = await getDoc(uRef);
  if (!snap.exists()) {
    await setDoc(uRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
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

// 2) upload profile photo
export async function uploadProfilePhoto(uid, file) {
  if (!file) throw new Error("No file");
  const ref = storageRef(storage, `profilePhotos/${uid}/avatar`);
  await uploadBytes(ref, file);
  const url = await getDownloadURL(ref);
  // update firestore
  await updateDoc(doc(db, "users", uid), { photoURL: url });
  // update auth profile for convenience
  if (auth.currentUser) await updateProfile(auth.currentUser, { photoURL: url });
  return url;
}

// 3) remove profile photo
export async function removeProfilePhoto(uid) {
  const ref = storageRef(storage, `profilePhotos/${uid}/avatar`);
  await deleteObject(ref).catch(() => {}); // ignore if not found
  await updateDoc(doc(db, "users", uid), { photoURL: "" });
  if (auth.currentUser) await updateProfile(auth.currentUser, { photoURL: null });
}

// 4) update user fields
export async function updateUserFields(uid, fields) {
  await updateDoc(doc(db, "users", uid), fields);
  if (auth.currentUser && fields.name) {
    await updateProfile(auth.currentUser, { displayName: fields.name });
  }
}

// 5) update streak (call on login or activity)
export async function updateStreak(uid) {
  const uRef = doc(db, "users", uid);
  const snap = await getDoc(uRef);
  if (!snap.exists()) return;
  const data = snap.data();
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  if (data.lastActiveDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (data.lastActiveDate === yesterday) {
    await updateDoc(uRef, { streakCount: (data.streakCount || 0) + 1, lastActiveDate: today });
  } else {
    await updateDoc(uRef, { streakCount: 1, lastActiveDate: today });
  }
}
