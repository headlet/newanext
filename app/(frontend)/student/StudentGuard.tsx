"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseApp } from "../../lib/firebase";
import { Loader2 } from "lucide-react";

export default function StudentGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const db = getFirestore(getFirebaseApp());

    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user || !user.email) {
          setAuthorized(false);
          router.replace("/login");
          return;
        }

        // Check Admin email override
        const adminEmailsEnv = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
        const adminEmailsList = adminEmailsEnv
          .split(",")
          .map((email) => email.trim().toLowerCase())
          .filter(Boolean);

        if (adminEmailsList.includes(user.email.trim().toLowerCase())) {
          setAuthorized(true);
          return;
        }

        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userRole = userData.roleId
              ? String(userData.roleId).trim().toLowerCase()
              : "";

            // Allow student, or admin/instructor to access student views if needed
            if (userRole === "student") {
              setAuthorized(true);
              return;
            }
          }

          setAuthorized(false);
          router.replace("/");
        } catch (error) {
          console.error("Error verifying permissions:", error);
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
