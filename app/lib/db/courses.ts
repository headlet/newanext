import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { getFirebaseApp } from "@/app/lib/firebase";

export type CoursePayload = {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  language: string;
  status: string;
  price: number;
  discount: number;
  discountEnd: string;
  instructor: string;
  tags: string[];
  certificate: boolean;
  studentQA: boolean;
  sections: Array<{
    title: string;
    duration: string;
    lessons: Array<{ title: string; duration: string }>;
  }>;
  students?: number;
  rating?: string;
  meta?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Fetch all courses (Index page)
export async function fetchAllCourses() {
  const db = getFirestore(getFirebaseApp());
  const querySnapshot = await getDocs(collection(db, "courses"));

  const courses: any[] = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const title = data.title || "Untitled Course";
    const initials = title
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    courses.push({
      id: docSnap.id,
      title: title,
      initials: initials || "C",
      meta: data.meta || "Updated recently",
      category: data.category || "General",
      price: data.price
        ? `NPR ${Number(data.price).toLocaleString("en-NP")}`
        : "NPR 0",
      students: data.students || 0,
      rating: data.rating || "—",
      status: data.status || "Draft",
    });
  });

  return courses;
}

// Fetch single course by ID (Edit & View pages)
export async function fetchCourseById(courseId: string) {
  const db = getFirestore(getFirebaseApp());
  const docRef = doc(db, "courses", courseId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

// Create a new course (Create page)
export async function createCourseInDb(courseData: CoursePayload) {
  const db = getFirestore(getFirebaseApp());
  const docRef = await addDoc(collection(db, "courses"), {
    ...courseData,
    students: 0,
    rating: "—",
    meta: "Created just now",
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

// Update an existing course (Edit page)
export async function updateCourseInDb(courseId: string, courseData: Partial<CoursePayload>) {
  const db = getFirestore(getFirebaseApp());
  const docRef = doc(db, "courses", courseId);
  await updateDoc(docRef, {
    ...courseData,
    updatedAt: new Date().toISOString(),
  });
}

// Delete a course (Index page)
export async function deleteCourseFromDb(courseId: string) {
  const db = getFirestore(getFirebaseApp());
  await deleteDoc(doc(db, "courses", courseId));
}