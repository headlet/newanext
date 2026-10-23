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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  color: string;
  createdAt: string;
}

const COLLECTION_NAME = "categories";

export async function getAllCategories(): Promise<Category[]> {
  const db = getFirebaseDb();
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

  return querySnapshot.docs.map((item) => {
    const data = item.data();
    return {
      id: item.id,
      name: data.name || "Untitled Category",
      slug: data.slug || "",
      description: data.description || "",
      count: data.count ?? 0,
      color: data.color || "#6366f1",
      createdAt: data.createdAt || new Date().toISOString(),
    };
  });
}

export async function saveCategory(
  id: string,
  data: Partial<Category>
): Promise<void> {
  const db = getFirebaseDb();
  await setDoc(
    doc(db, COLLECTION_NAME, id),
    {
      ...data,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function deleteCategoryFromDb(id: string): Promise<void> {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}