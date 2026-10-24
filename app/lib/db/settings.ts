"use client";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  type Firestore,
} from "firebase/firestore";
import { getFirebaseApp } from "../firebase";

function getFirebaseDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

export interface TeamMember {
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface SettingsData {
  general: {
    companyName: string;
    website: string;
    supportEmail: string;
    alternateEmail: string;
    phone: string;
    address: string;
    timezone: string;
    currency: string;
    language: string;
    dateFormat: string;
  };
  branding: {
    primary: string;
    accent: string;
    dark: string;
    tagline: string;
    logoPreview?: string;
    logoName?: string;
    // ImageKit fields for workspace logo
    logoUrl?: string;
    logoFileId?: string;
    logoFolder?: string;
  };
  notifications: {
    newEnquiry: boolean;
    contactForm: boolean;
    contentChanges: boolean;
    courseUpdates: boolean;
    portfolioUpdates: boolean;
    weeklySummary: boolean;
    securityAlerts: boolean;
    productUpdates: boolean;
  };
  security: {
    twoFactor: boolean;
    loginAlerts: boolean;
    sessionExpiry: boolean;
    strongPasswords: boolean;
  };
  integrations: {
    analytics: boolean;
    searchConsole: boolean;
    emailService: boolean;
    cloudStorage: boolean;
    socialLinks: boolean;
  };
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    github: string;
    youtube: string;
  };
  team: TeamMember[];
}

const SETTINGS_DOC_REF = "global_workspace_settings";

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

export async function getSettingsFromDb(): Promise<SettingsData | null> {
  const db = getFirebaseDb();
  const docRef = doc(db, "settings", SETTINGS_DOC_REF);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as SettingsData;
}

export async function saveSettingsToDb(data: SettingsData): Promise<void> {
  const db = getFirebaseDb();
  const docRef = doc(db, "settings", SETTINGS_DOC_REF);

  // Fetch existing settings to handle old logo file cleanup if replaced or cleared
  const existingSnap = await getDoc(docRef);
  if (existingSnap.exists()) {
    const existingData = existingSnap.data() as SettingsData;
    const oldLogoFileId = existingData.branding?.logoFileId || "";
    const newLogoFileId = data.branding?.logoFileId || "";

    if (oldLogoFileId && oldLogoFileId !== newLogoFileId) {
      try {
        await deleteImageKitFile(oldLogoFileId);
      } catch (error) {
        console.error("Failed to delete old ImageKit logo:", error);
      }
    }
  }

  await setDoc(docRef, data, { merge: true });
}