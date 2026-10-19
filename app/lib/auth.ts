
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import { getFirebaseAuth } from "./firebase";

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

  await updateProfile(credential.user, {
    displayName: name,
  });

  return credential.user;
}

export async function loginUser(
  email: string,
  password: string
) {
  const credential = await signInWithEmailAndPassword(
    getFirebaseAuth(),
    email,
    password
  );

  return credential.user;
}

export async function logoutUser() {
  await signOut(getFirebaseAuth());
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(getFirebaseAuth(), email);
}
