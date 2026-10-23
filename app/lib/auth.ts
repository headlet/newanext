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
import { getUserProfile, saveUserProfile } from "./db/user";

// Helper to check if email is in NEXT_PUBLIC_ADMIN_EMAILS
function isAdminEmail(email: string | null): boolean {
  if (!email) return false;
  const adminEmailsString = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  const adminEmails = adminEmailsString
    .split(",")
    .map((e) => e.trim().toLowerCase());
  return adminEmails.includes(email.toLowerCase());
}

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

  // Assign roleId based on admin email list or default to "student"
  const roleId = isAdminEmail(email) ? "admin" : "student";

  await saveUserProfile(credential.user.uid, {
    uid: credential.user.uid,
    name: name,
    email: email,
    roleId: roleId,
    createdAt: new Date().toISOString(),
  });

  return { user: credential.user, roleId };
}

export async function loginUser(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(
    getFirebaseAuth(),
    email,
    password
  );

  // If email matches admin list, bypass Firestore check and return admin roleId
  if (isAdminEmail(credential.user.email)) {
    return { user: credential.user, roleId: "admin" };
  }

  // Fetch roleId from Firestore user profile
  const profile = await getUserProfile(credential.user.uid);
  const roleId = profile?.roleId || "student";

  return { user: credential.user, roleId };
}

export async function signInWithGoogle() {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  const user = credential.user;

  if (isAdminEmail(user.email)) {
    return { user, roleId: "admin" };
  }

  const profile = await getUserProfile(user.uid);
  let roleId = profile?.roleId;

  if (!profile) {
    roleId = "student"; // Default roleId for new Google users
    await saveUserProfile(user.uid, {
      uid: user.uid,
      name: user.displayName || "Google User",
      email: user.email || "",
      roleId: roleId,
      createdAt: new Date().toISOString(),
    });
  }

  return { user, roleId: roleId || "student" };
}

export async function logoutUser() {
  await signOut(getFirebaseAuth());
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(getFirebaseAuth(), email);
}