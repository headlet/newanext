import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc,
  type Firestore
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
  role: string; // e.g., "user", "admin"
  createdAt: string;
}

// Fetch all permissions
export async function getAllPermissions(): Promise<Permission[]> {
  const db = getFirebaseDb();
  const querySnapshot = await getDocs(collection(db, "permissions"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Permission));
}

// Fetch all roles
export async function getAllRoles(): Promise<Role[]> {
  const db = getFirebaseDb();
  const querySnapshot = await getDocs(collection(db, "roles"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Role));
}

// Create or update a role
export async function saveRole(roleId: string, name: string, permissions: string[]) {
  const db = getFirebaseDb();
  await setDoc(doc(db, "roles", roleId), { name, permissions }, { merge: true });
}

// Get a single role
export async function getRole(roleId: string): Promise<Role | null> {
  const db = getFirebaseDb();
  const docSnap = await getDoc(doc(db, "roles", roleId));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Role;
  }
  return null;
}

// Delete role from Firestore
export async function deleteRole(roleId: string) {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, "roles", roleId));
}

// Save or update user profile in Firestore
export async function saveUserProfile(uid: string, data: Partial<UserProfile>) {
  const db = getFirebaseDb();
  await setDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

// Get user profile data
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const db = getFirebaseDb();
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
  }
  return null;
}