"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseApp } from "../lib/firebase";
import { Loader2 } from "lucide-react";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const db = getFirestore(getFirebaseApp());

    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user || !user.email) {
          console.log("Guard: No user logged in or email missing.");
          setAuthorized(false);
          router.replace("/login");
          return;
        }

        // 1. Read from either NEXT_PUBLIC_ADMIN_EMAILS or NEXT_PUBLIC_ADMIN_EMAIL
        const adminEmailsEnv =
          process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
          process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
          "";

        // Split by comma, trim whitespace, and convert to lowercase
        const adminEmailsList = adminEmailsEnv
          .split(",")
          .map((email) => email.trim().toLowerCase())
          .filter(Boolean);

        const userEmail = user.email.trim().toLowerCase();

        console.log("Guard: Logged-in email ->", userEmail);
        console.log("Guard: Allowed env emails ->", adminEmailsList);

        if (adminEmailsList.includes(userEmail)) {
          console.log("Guard: Email matched env list! Access granted.");
          setAuthorized(true);
          return;
        }

        try {
          // 2. Fallback to Firestore user role/isAdmin check
          console.log(
            "Guard: Email not in env list, checking Firestore role...",
          );
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("Guard: Firestore user data ->", userData);

            // Clean role string in case Firestore has trailing spaces (e.g. "ser " or "admin ")
            const userRole = userData.roleId
              ? String(userData.roleId).trim().toLowerCase()
              : "";

            if (userRole === "admin" || userData.isAdmin === true) {
              console.log("Guard: Firestore role is admin! Access granted.");
              setAuthorized(true);
              return;
            }
          }

          console.log("Guard: Unauthorized. Redirecting to home.");
          setAuthorized(false);
          router.replace("/");
        } catch (error) {
          console.error("Error verifying admin permissions:", error);
          setAuthorized(false);
          router.replace("/");
        }
      },
      () => {
        setAuthorized(false);
        router.replace("/login");
      },
    );

    return () => unsubscribe();
  }, [router]);

  if (authorized === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600" size={36} />
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
