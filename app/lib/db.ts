
"use client";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  type Firestore,
} from "firebase/firestore";

import { getFirebaseApp } from "./firebase";

function getFirebaseDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
  photoURL?: string;
}

export async function getAllPermissions(): Promise<Permission[]> {
  const db = getFirebaseDb();
  const querySnapshot = await getDocs(
    collection(db, "permissions")
  );

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  } as Permission));
}

export async function getAllRoles(): Promise<Role[]> {
  const db = getFirebaseDb();
  const querySnapshot = await getDocs(
    collection(db, "roles")
  );

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  } as Role));
}

export async function saveRole(
  roleId: string,
  name: string,
  permissions: string[]
): Promise<void> {
  const db = getFirebaseDb();

  await setDoc(
    doc(db, "roles", roleId),
    { name, permissions },
    { merge: true }
  );
}

export async function getRole(
  roleId: string
): Promise<Role | null> {
  const db = getFirebaseDb();
  const docSnap = await getDoc(doc(db, "roles", roleId));

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Role;
}

export async function deleteRole(
  roleId: string
): Promise<void> {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, "roles", roleId));
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