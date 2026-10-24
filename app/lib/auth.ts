import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth";

import { getFirebaseAuth } from "./firebase";
import { getUserProfile, saveUserProfile } from "./db/user";

const SESSION_KEY = "newanext_last_login_time";
const TWO_HOURS_MS = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// Helper to check if email is in NEXT_PUBLIC_ADMIN_EMAILS
function isAdminEmail(email: string | null): boolean {
  if (!email) return false;
  const adminEmailsString = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  const adminEmails = adminEmailsString
    .split(",")
    .map((e) => e.trim().toLowerCase());
  return adminEmails.includes(email.toLowerCase());
}

/**
 * Stores the current timestamp in localStorage to track session age
 */
export function recordSessionStartTime() {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, Date.now().toString());
  }
}

/**
 * Validates if the user session has exceeded 2 hours.
 * If expired, logs out the user and clears session storage.
 */
export async function checkAndEnforceSessionTimeout(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const auth = getFirebaseAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return false;

  const lastLoginStr = localStorage.getItem(SESSION_KEY);
  if (!lastLoginStr) {
    // If no session time exists for logged-in user, start tracking now
    recordSessionStartTime();
    return false;
  }

  const lastLoginTime = parseInt(lastLoginStr, 10);
  const now = Date.now();

  if (now - lastLoginTime > TWO_HOURS_MS) {
    // Session expired: Logout user and clean up storage
    await logoutUser();
    return true; // Indicates session was expired and logged out
  }

  return false;
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

  const roleId = isAdminEmail(email) ? "admin" : "student";

  await saveUserProfile(credential.user.uid, {
    uid: credential.user.uid,
    name: name,
    email: email,
    roleId: roleId,
    createdAt: new Date().toISOString(),
  });

  recordSessionStartTime();
  return { user: credential.user, roleId };
}

export async function loginUser(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(
    getFirebaseAuth(),
    email,
    password
  );

  recordSessionStartTime();

  if (isAdminEmail(credential.user.email)) {
    return { user: credential.user, roleId: "admin" };
  }

  const profile = await getUserProfile(credential.user.uid);
  const roleId = profile?.roleId || "student";

  return { user: credential.user, roleId };
}

export async function signInWithGoogle() {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  const user = credential.user;

  recordSessionStartTime();

  if (isAdminEmail(user.email)) {
    return { user, roleId: "admin" };
  }

  const profile = await getUserProfile(user.uid);
  let roleId = profile?.roleId;

  if (!profile) {
    roleId = "student";
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
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
  await signOut(getFirebaseAuth());
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(getFirebaseAuth(), email);
}