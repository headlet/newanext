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

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthorized(false);
        router.replace("/login");
        return;
      }

      // 1. Check email against environment variable
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (adminEmail && user.email === adminEmail) {
        setAuthorized(true);
        return;
      }

      try {
        // 2. Fallback to Firestore user role/isAdmin check
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === "admin" || userData.isAdmin === true) {
            setAuthorized(true);
            return;
          }
        }

        // If unauthorized, redirect to home
        setAuthorized(false);
        router.replace("/");
      } catch (error) {
        console.error("Error verifying admin permissions:", error);
        setAuthorized(false);
        router.replace("/");
      }
    }, () => {
      setAuthorized(false);
      router.replace("/login");
    });

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