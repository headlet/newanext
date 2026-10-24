"use client";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  type Firestore,
} from "firebase/firestore";
import { getFirebaseApp } from "../firebase";

const COLLECTION_NAME = "about_sections";

function getFirebaseDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

function getAboutCollection() {
  return collection(getFirebaseDb(), COLLECTION_NAME);
}

export type AboutSectionPayload = {
  sectionKey: "mission_vision" | "our_story" | "leadership" | "values" | "stats";
  title: string;
  subtitle: string;
  content: string; // Rich text HTML content
  badgeText: string;

  // ImageKit fields
  imageUrl?: string;
  imageFileId?: string;
  imageFolder?: string;

  createdAt?: string;
  updatedAt?: string;
};

export type AboutSectionRecord = AboutSectionPayload & {
  id: string;
};

type ImageKitDeleteResponse = {
  success?: boolean;
  error?: string;
  details?: string;
  message?: string;
};

/**
 * Delete an ImageKit asset through the secure server-only API route.
 * The ImageKit private key remains hidden on the server.
 */
async function deleteImageKitFile(fileId: string): Promise<void> {
  const cleanFileId = fileId.trim();
  if (!cleanFileId) return;

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
      result = { message: responseText };
    }
  }

  if (!response.ok || result.success === false) {
    const details = [result.error, result.details, result.message]
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

/**
 * Fetch all About sections for the admin or frontend display.
 */
export async function getAllAboutSections(): Promise<AboutSectionRecord[]> {
  const querySnapshot = await getDocs(getAboutCollection());

  return querySnapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      sectionKey: data.sectionKey || "our_story",
      title: data.title || "Untitled Section",
      subtitle: data.subtitle || "",
      content: data.content || "",
      badgeText: data.badgeText || "About NewaNext",
      imageUrl: data.imageUrl || "",
      imageFileId: data.imageFileId || "",
      imageFolder: data.imageFolder || "/about",
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || "",
    };
  });
}

/**
 * Fetch a single About section by its document ID.
 */
export async function fetchAboutSectionById(
  sectionId: string,
): Promise<AboutSectionRecord | null> {
  if (!sectionId.trim()) {
    throw new Error("Section ID is required.");
  }

  const sectionRef = doc(getFirebaseDb(), COLLECTION_NAME, sectionId);
  const sectionSnap = await getDoc(sectionRef);

  if (!sectionSnap.exists()) {
    return null;
  }

  const data = sectionSnap.data();
  return {
    id: sectionSnap.id,
    sectionKey: data.sectionKey || "our_story",
    title: data.title || "Untitled Section",
    subtitle: data.subtitle || "",
    content: data.content || "",
    badgeText: data.badgeText || "About NewaNext",
    imageUrl: data.imageUrl || "",
    imageFileId: data.imageFileId || "",
    imageFolder: data.imageFolder || "/about",
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || "",
  };
}

/**
 * Create a new About section in Firestore.
 */
export async function createAboutSectionInDb(
  sectionData: AboutSectionPayload,
): Promise<string> {
  const imageUrl = sectionData.imageUrl || "";
  const imageFileId = sectionData.imageFileId || "";

  if (imageUrl && !imageFileId) {
    throw new Error(
      "Cannot save the about section image without its ImageKit file ID.",
    );
  }

  try {
    const docRef = await addDoc(getAboutCollection(), {
      ...sectionData,
      imageUrl,
      imageFileId,
      imageFolder: sectionData.imageFolder ?? "/about",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return docRef.id;
  } catch (error) {
    if (imageFileId) {
      try {
        await deleteImageKitFile(imageFileId);
      } catch (cleanupError) {
        console.error(
          "About section creation failed and its uploaded ImageKit image could not be cleaned up:",
          cleanupError,
        );
      }
    }
    throw error;
  }
}

/**
 * Update or Upsert an About section and synchronize ImageKit changes.
 */
export async function updateAboutSectionInDb(
  sectionId: string,
  sectionData: Partial<AboutSectionPayload>,
): Promise<void> {
  if (!sectionId.trim()) {
    throw new Error("Section ID is required.");
  }

  const db = getFirebaseDb();
  const sectionRef = doc(db, COLLECTION_NAME, sectionId);

  const existingSnap = await getDoc(sectionRef);

  // If document doesn't exist yet, create it cleanly
  if (!existingSnap.exists()) {
    await setDoc(
      sectionRef,
      {
        ...sectionData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return;
  }

  const existingData = existingSnap.data();
  const oldImageUrl =
    typeof existingData.imageUrl === "string" ? existingData.imageUrl : "";
  const oldImageFileId =
    typeof existingData.imageFileId === "string"
      ? existingData.imageFileId
      : "";

  const hasImageUrl = Object.prototype.hasOwnProperty.call(
    sectionData,
    "imageUrl",
  );
  const hasImageFileId = Object.prototype.hasOwnProperty.call(
    sectionData,
    "imageFileId",
  );

  let nextImageUrl = hasImageUrl
    ? typeof sectionData.imageUrl === "string"
      ? sectionData.imageUrl
      : ""
    : oldImageUrl;

  let nextImageFileId = hasImageFileId
    ? typeof sectionData.imageFileId === "string"
      ? sectionData.imageFileId
      : ""
    : oldImageFileId;

  const imageUpdateRequested = hasImageUrl || hasImageFileId;
  const imageChanged =
    nextImageUrl !== oldImageUrl || nextImageFileId !== oldImageFileId;

  if (imageUpdateRequested && imageChanged) {
    const removingImage = !nextImageUrl || !nextImageFileId;

    if (removingImage) {
      nextImageUrl = "";
      nextImageFileId = "";
    } else {
      if (nextImageUrl !== oldImageUrl && !hasImageFileId) {
        throw new Error(
          "A replacement image URL was provided without its ImageKit file ID.",
        );
      }
      if (
        nextImageUrl !== oldImageUrl &&
        nextImageFileId === oldImageFileId
      ) {
        throw new Error(
          "The image URL changed but its file ID is still the old ID. Pass both the new imageUrl and new imageFileId.",
        );
      }
    }
  }

  const updatedData: Record<string, unknown> = {
    ...sectionData,
    updatedAt: new Date().toISOString(),
  };

  if (imageUpdateRequested) {
    updatedData.imageUrl = nextImageUrl;
    updatedData.imageFileId = nextImageFileId;
    if (sectionData.imageFolder !== undefined) {
      updatedData.imageFolder = sectionData.imageFolder;
    }
  }

  await updateDoc(sectionRef, updatedData);

  // Clean up previous image asset from ImageKit if replaced
  const oldImageMustBeDeleted =
    Boolean(oldImageFileId) &&
    oldImageFileId !== nextImageFileId &&
    imageChanged;

  if (oldImageMustBeDeleted) {
    try {
      await deleteImageKitFile(oldImageFileId);
    } catch (error) {
      console.error(
        "The about section was saved, but the previous ImageKit image removal failed:",
        error,
      );
    }
  }
}

/**
 * Delete an About section from Firestore and its associated ImageKit asset.
 */
export async function deleteAboutSectionFromDb(
  sectionId: string,
): Promise<void> {
  if (!sectionId.trim()) {
    throw new Error("Section ID is required.");
  }

  const db = getFirebaseDb();
  const sectionRef = doc(db, COLLECTION_NAME, sectionId);
  const sectionSnap = await getDoc(sectionRef);

  if (!sectionSnap.exists()) {
    return;
  }

  const data = sectionSnap.data();
  const imageFileId =
    typeof data.imageFileId === "string" ? data.imageFileId : "";

  if (imageFileId) {
    await deleteImageKitFile(imageFileId);
  }

  try {
    await deleteDoc(sectionRef);
  } catch (error) {
    if (imageFileId) {
      try {
        await updateDoc(sectionRef, {
          imageUrl: "",
          imageFileId: "",
          updatedAt: new Date().toISOString(),
        });
      } catch (cleanupError) {
        console.error(
          "Could not clear the deleted image reference from Firestore:",
          cleanupError,
        );
      }
    }
    throw error;
  }
}

/**
 * Universal Save handler: automatically handles creating new or updating existing sections.
 */
export async function saveAboutSection(
  id: string,
  data: Partial<AboutSectionPayload>,
): Promise<void> {
  if (!id || id.trim() === "") {
    await createAboutSectionInDb(data as AboutSectionPayload);
  } else {
    await updateAboutSectionInDb(id, data);
  }
}