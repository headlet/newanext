"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { getFirebaseAuth } from "./firebase";
import { getUserProfile, saveUserProfile } from "./db";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const auth = getFirebaseAuth();

  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(credential.user, { displayName: name });

  // Save user profile in Firestore with default role "user"
  await saveUserProfile(credential.user.uid, {
    uid: credential.user.uid,
    name: name,
    email: email,
    role: "student", // Default role assigned here
    createdAt: new Date().toISOString(),
  });

  return credential.user;
}

export async function loginUser(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(
    getFirebaseAuth(),
    email,
    password
  );

  return credential.user;
}

export async function signInWithGoogle() {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  const user = credential.user;

  // Check if profile already exists in Firestore
  const existingProfile = await getUserProfile(user.uid);

  if (!existingProfile) {
    // First time Google sign-in: create user profile in Firestore
    await saveUserProfile(user.uid, {
      uid: user.uid,
      name: user.displayName || "Google User",
      email: user.email || "",
      role: "student",
      createdAt: new Date().toISOString(),
    });
  }

  return user;
}

export async function logoutUser() {
  await signOut(getFirebaseAuth());
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(getFirebaseAuth(), email);
}