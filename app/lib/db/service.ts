"use client";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  type Firestore,
} from "firebase/firestore";
import { getFirebaseApp } from "../firebase";

function getFirebaseDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number | null;
  pricingType: "Starting at" | "Fixed" | "Custom";
  status: "Published" | "Draft";
  features?: string[];
  image?: string;
  imageName?: string;
  icon?: string;
}

export async function getAllServices(): Promise<Service[]> {
  const db = getFirebaseDb();
  const querySnapshot = await getDocs(collection(db, "services"));
  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  } as Service));
}

export async function getService(id: string): Promise<Service | null> {
  const db = getFirebaseDb();
  const docRef = doc(db, "services", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Service;
}

export async function saveService(
  id: string | null,
  data: Omit<Service, "id">
): Promise<string> {
  const db = getFirebaseDb();
  if (id) {
    await setDoc(doc(db, "services", id), data, { merge: true });
    return id;
  } else {
    const docRef = await addDoc(collection(db, "services"), data);
    return docRef.id;
  }
}

export async function deleteServiceFromDb(id: string): Promise<void> {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, "services", id));
}