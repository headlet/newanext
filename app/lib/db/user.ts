"use client";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  type Firestore,
} from "firebase/firestore";

import { getFirebaseApp } from "../firebase";

function getFirebaseDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
  photoURL?: string;
  phone?: string;
  jobTitle?: string;
  bio?: string;
}

export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  const db = getFirebaseDb();
  const docSnap = await getDoc(doc(db, "users", uid));

  if (!docSnap.exists()) {
    return null;
  }

  return {
    uid: docSnap.id,
    ...docSnap.data(),
  } as UserProfile;
}

export async function saveUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const db = getFirebaseDb();

  await setDoc(
    doc(db, "users", uid),
    {
      ...data,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}


export async function deleteUserFromDb(uid: string): Promise<void> {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, "users", uid));
}

export async function getAllUsers(): Promise<UserProfile[]> {
  const db = getFirebaseDb();
  const querySnapshot = await getDocs(collection(db, "users"));

  return querySnapshot.docs.map((item) => {
    const data = item.data();
    return {
      uid: item.id,
      name: data.name || data.displayName || "Unnamed User",
      email: data.email || "No email",
      role: data.role || "Student",
      createdAt: data.createdAt || "",
      updatedAt: data.updatedAt,
      photoURL: data.photoURL,
      ...data,
    } as UserProfile;
  });
}