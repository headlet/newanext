
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "../lib/firebase";

export default function AdminGuard({ children,}: {children: ReactNode;}) {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();

    const unsubscribe = onAuthStateChanged(auth,
      (user) => {
        if (!user) {
          setAuthenticated(false);
          router.replace("/login");
          return;
        }

        setAuthenticated(true);
      },
      () => {
        setAuthenticated(false);
        router.replace("/login");
      }
    );

    return () => unsubscribe();
  }, [router]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50">
//         <p className="text-sm text-gray-500">
//           Checking authentication...
//         </p>
//       </div>
//     );
//   }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
