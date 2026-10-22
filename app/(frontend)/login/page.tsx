"use client";

import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirebaseAuth } from "../../lib/firebase";
import { getUserProfile, saveUserProfile } from "@/app/lib/db/user";
import { useRouter } from "next/navigation";

type AuthTab = "signin" | "signup";

export default function AuthPage() {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState<AuthTab>("signin");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    icon: "✨",
  });

  // Redirect signed-in users without displaying a loading screen.
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    try {
      const auth = getFirebaseAuth();

      unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (!cancelled && user) {
            router.replace("/admin");
          }
        },
        (error) => {
          console.error("Authentication state error:", error);
        },
      );
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [router]);

  const showToast = (message: string, icon = "✨") => {
    setToast({ visible: true, message, icon });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getAuthErrorMessage = (error: unknown): string => {
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String(error.code)
        : "";

    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Invalid email or password.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";
      case "auth/popup-blocked":
        return "Your browser blocked the sign-in popup.";
      case "auth/unauthorized-domain":
        return "This domain is not authorized in Firebase.";
      case "auth/operation-not-allowed":
        return "This sign-in method is not enabled in Firebase.";
      case "auth/network-request-failed":
        return "Network error. Check your internet connection.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      case "auth/invalid-api-key":
        return "Firebase API key is missing or invalid. Check your environment variables.";
      case "auth/missing-email":
        return "Please enter your email address.";
      default:
        console.error("Firebase authentication error:", error);
        return "Something went wrong. Please try again.";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const email = formData.email.trim();

    if (!email) {
      showToast("Please enter your email address.", "⚠️");
      return;
    }

    if (currentTab === "signup") {
      if (!formData.fullName.trim()) {
        showToast("Please enter your full name.", "⚠️");
        return;
      }

      if (formData.password.length < 6) {
        showToast("Password must be at least 6 characters.", "⚠️");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        showToast("Passwords do not match. Please check again.", "⚠️");
        return;
      }
    }

    setIsLoading(true);

    try {
      const auth = getFirebaseAuth();

      if (currentTab === "signin") {
        await setPersistence(
          auth,
          formData.rememberMe
            ? browserLocalPersistence
            : browserSessionPersistence,
        );

        const credential = await signInWithEmailAndPassword(
          auth,
          email,
          formData.password,
        );

        showToast(
          `Welcome back, ${
            credential.user.displayName || credential.user.email || "user"
          }!`,
          "🚀",
        );

        router.replace("/admin");
      } else {
        // 1. Create Firebase Auth user
        const credential = await createUserWithEmailAndPassword(
          auth,
          email,
          formData.password,
        );

        // 2. Update display name in Auth
        await updateProfile(credential.user, {
          displayName: formData.fullName.trim(),
        });

        // 3. Save user document in Firestore with default role "user"
        await saveUserProfile(credential.user.uid, {
          uid: credential.user.uid,
          name: formData.fullName.trim(),
          email: email,
          role: "user", // Default system role
          createdAt: new Date().toISOString(),
        });

        showToast("Account created successfully! Welcome to NewaNext.", "🎉");

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          rememberMe: false,
        });

        setCurrentTab("signin");
      }
    } catch (error) {
      showToast(getAuthErrorMessage(error), "⚠️");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const email = formData.email.trim();

    if (!email) {
      showToast("Enter your email address first.", "⚠️");
      return;
    }

    try {
      await sendPasswordResetEmail(getFirebaseAuth(), email);

      showToast(
        "If the account exists, a password reset email will be sent.",
        "✉️",
      );
    } catch (error) {
      showToast(getAuthErrorMessage(error), "⚠️");
    }
  };

  const handleSocialLogin = async (provider: string) => {
    if (provider === "GitHub") {
      showToast("GitHub sign-in is not configured yet.", "⚠️");
      return;
    }

    if (provider !== "Google" || isLoading) return;

    setIsLoading(true);

    try {
      const auth = getFirebaseAuth();
      const googleProvider = new GoogleAuthProvider();

      const credential = await signInWithPopup(auth, googleProvider);
      const user = credential.user;

      // Check if user profile already exists in Firestore
      const existingProfile = await getUserProfile(user.uid);

      if (!existingProfile) {
        // First time Google sign-in: create user profile in Firestore
        await saveUserProfile(user.uid, {
          uid: user.uid,
          name: user.displayName || "Google User",
          email: user.email || "",
          role: "user", // Default system role
          createdAt: new Date().toISOString(),
        });
      }

      showToast(
        `Welcome back, ${user.displayName || user.email || "user"}!`,
        "🚀",
      );

      router.replace("/admin");
    } catch (error) {
      showToast(getAuthErrorMessage(error), "⚠️");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-slate-50 p-4 font-sans text-slate-800 sm:p-6 lg:p-8">
      {/* Ambient light accents */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl" />

      {/* Toast notification */}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed right-5 top-5 z-50 transform transition-all duration-300 ${
          toast.visible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex max-w-sm items-center space-x-3 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3.5 text-white shadow-2xl">
          <span className="text-xl">{toast.icon}</span>
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      </div>

      <main className="relative z-10 my-8 w-full max-w-md">
        {/* Header */}
        <div className="mb-8 space-y-3 text-center">
          <span className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 shadow-sm">
            NewaNext Portal
          </span>

          <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            {currentTab === "signin" ? "Welcome Back" : "Create an Account"}
          </h1>

          <p className="text-sm text-gray-600">
            {currentTab === "signin"
              ? "Access your dashboard and custom software projects in Kathmandu."
              : "Join NewaNext to start your next custom software project."}
          </p>
        </div>

        {/* Authentication card */}
        <div className="relative rounded-3xl border border-gray-100 bg-white/90 p-8 shadow-xl backdrop-blur-md sm:p-10">
          {/* Tabs */}
          <div className="mb-8 flex rounded-2xl bg-slate-100 p-1.5">
            <button
              type="button"
              onClick={() => setCurrentTab("signin")}
              className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all ${
                currentTab === "signin"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab("signup")}
              className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all ${
                currentTab === "signup"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentTab === "signup" && (
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Manish Sharma"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-gray-800 transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="manish@example.com"
                required
                className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-gray-800 transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={isPasswordShown ? "text" : "password"}
                  name="password"
                  autoComplete={
                    currentTab === "signin"
                      ? "current-password"
                      : "new-password"
                  }
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 pr-14 text-sm text-gray-800 transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  type="button"
                  onClick={() => setIsPasswordShown((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-purple-600 hover:text-purple-800 focus:outline-none"
                >
                  {isPasswordShown ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {currentTab === "signup" && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-sm font-semibold text-gray-700"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type={isPasswordShown ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-gray-800 transition-all focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {currentTab === "signin" && (
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex cursor-pointer items-center text-gray-600">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />

                  <span className="font-medium">Remember me</span>
                </label>

                <a
                  href="#forgot"
                  onClick={handleForgotPassword}
                  className="font-semibold text-purple-600 transition-colors hover:text-purple-800"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Please wait..."
                : currentTab === "signin"
                  ? "Sign In →"
                  : "Create Account →"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 font-semibold tracking-wider text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center space-x-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-60"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <span>Google</span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleSocialLogin("GitHub")}
              className="flex items-center justify-center space-x-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-60"
            >
              <svg
                className="h-4 w-4 fill-current text-gray-800"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-.466-.908-.62.069-.608 1.003.07 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>

              <span>GitHub</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs font-medium text-gray-400">
          <p>© NewaNext Technologies. Kathmandu, Nepal.</p>
        </div>
      </main>
    </div>
  );
}