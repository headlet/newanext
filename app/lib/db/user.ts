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

const COLLECTION_NAME = "users";

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
  imageFileId?: string;
  imageFolder?: string;
  phone?: string;
  jobTitle?: string;
  bio?: string;
}

type ImageKitDeleteResponse = {
  success?: boolean;
  error?: string;
  details?: string;
  message?: string;
};

/**
 * Delete an ImageKit asset through the server-only API route.
 */
async function deleteImageKitFile(fileId: string): Promise<void> {
  const cleanFileId = fileId.trim();

  if (!cleanFileId) {
    return;
  }

  const response = await fetch("/api/delete-auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      fileId: cleanFileId,
    }),
  });

  const responseText = await response.text();

  let result: ImageKitDeleteResponse = {};

  if (responseText) {
    try {
      result = JSON.parse(responseText) as ImageKitDeleteResponse;
    } catch {
      result = {
        message: responseText,
      };
    }
  }

  if (!response.ok || result.success === false) {
    const details = [
      result.error,
      result.details,
      result.message,
    ]
      .filter(Boolean)
      .join(" | ");

    console.error("ImageKit deletion request failed:", {
      status: response.status,
      fileId: cleanFileId,
      details,
    });

    throw new Error(
      `ImageKit deletion failed (${response.status}): ${
        details || response.statusText
      }`,
    );
  }
}

export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  const db = getFirebaseDb();
  const docSnap = await getDoc(doc(db, COLLECTION_NAME, uid));

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();

  return {
    uid: docSnap.id,
    ...data,
    photoURL: data.photoURL || "",
    imageFileId: data.imageFileId || "",
    imageFolder: data.imageFolder || "/user",
  } as UserProfile;
}

export async function saveUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const db = getFirebaseDb();
  const userRef = doc(db, COLLECTION_NAME, uid);

  // Fetch existing profile data to detect avatar/photo replacement or deletion
  const existingSnap = await getDoc(userRef);
  const existingData = existingSnap.exists() ? existingSnap.data() : {};

  const oldPhotoURL = typeof existingData.photoURL === "string" ? existingData.photoURL : "";
  const oldImageFileId = typeof existingData.imageFileId === "string" ? existingData.imageFileId : "";

  const hasPhotoURL = Object.prototype.hasOwnProperty.call(data, "photoURL") || Object.prototype.hasOwnProperty.call(data, "imageFileId");
  const incomingPhoto = data.photoURL;

  let nextPhotoURL = hasPhotoURL
    ? typeof incomingPhoto === "string"
      ? incomingPhoto
      : ""
    : oldPhotoURL;

  let nextImageFileId = Object.prototype.hasOwnProperty.call(data, "imageFileId")
    ? typeof data.imageFileId === "string"
      ? data.imageFileId
      : ""
    : oldImageFileId;

  const imageChanged = nextPhotoURL !== oldPhotoURL || nextImageFileId !== oldImageFileId;

  const updatedData: Record<string, unknown> = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (hasPhotoURL) {
    updatedData.photoURL = nextPhotoURL;
    updatedData.imageFileId = nextImageFileId;
    if (data.imageFolder !== undefined) {
      updatedData.imageFolder = data.imageFolder;
    }
  }
  await setDoc(userRef, updatedData, { merge: true });

  // Clean up previous image asset if replaced or removed
  const oldImageMustBeDeleted =
    Boolean(oldImageFileId) &&
    oldImageFileId !== nextImageFileId &&
    imageChanged;

  if (oldImageMustBeDeleted) {
    try {
      await deleteImageKitFile(oldImageFileId);
      console.info("Deleted previous user avatar from ImageKit:", oldImageFileId);
    } catch (error) {
      console.error("The user profile was saved, but deletion of the old ImageKit avatar failed:", error);
    }
  }
}

export async function deleteUserFromDb(uid: string): Promise<void> {
  const db = getFirebaseDb();
  const userRef = doc(db, COLLECTION_NAME, uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const imageFileId = typeof data.imageFileId === "string" ? data.imageFileId : "";

    if (imageFileId) {
      try {
        await deleteImageKitFile(imageFileId);
      } catch (error) {
        console.error("Failed to delete user avatar from ImageKit during account deletion:", error);
      }
    }
  }

  await deleteDoc(userRef);
}

export async function getAllUsers(): Promise<UserProfile[]> {
  const db = getFirebaseDb();
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

  return querySnapshot.docs.map((item) => {
    const data = item.data();
    return {
      uid: item.id,
      name: data.name || data.displayName || "Unnamed User",
      email: data.email || "No email",
      role: data.role || "Student",
      createdAt: data.createdAt || "",
      updatedAt: data.updatedAt,
      photoURL: data.photoURL || "",
      imageFileId: data.imageFileId || "",
      imageFolder: data.imageFolder || "/user",
      ...data,
    } as UserProfile;
  });
}