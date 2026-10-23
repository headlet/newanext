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
  await setDoc(docRef, data, { merge: true });
}