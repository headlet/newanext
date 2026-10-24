
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

const COLLECTION_NAME = "courses";

/**
 * Use the existing Firebase app and Firestore instance.
 * firebase.ts is not changed.
 */
function getCoursesDb() {
  return getFirestore(getFirebaseApp());
}

function getCoursesCollection() {
  return collection(getCoursesDb(), COLLECTION_NAME);
}

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

  // ImageKit
  imageUrl?: string;
  imageFileId?: string;
  imageFolder?: string;

  sections: Array<{
    title: string;
    duration: string;
    lessons: Array<{
      title: string;
      duration: string;
    }>;
  }>;

  students?: number;
  rating?: string;
  meta?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CourseRecord = CoursePayload & {
  id: string;
};

type ImageKitDeleteResponse = {
  success?: boolean;
  error?: string;
  details?: string;
  message?: string;
};

/**
 * Delete an ImageKit asset through the server-only API route.
 *
 * The ImageKit private key must NEVER be exposed in this file
 * or sent to the browser.
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

/**
 * Fetch all courses for the admin listing.
 */
export async function fetchAllCourses() {
  const querySnapshot = await getDocs(getCoursesCollection());

  return querySnapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    const title = String(data.title || "Untitled Course");

    const initials = title
      .split(/\s+/)
      .filter(Boolean)
      .map((word: string) => word[0] || "")
      .join("")
      .substring(0, 2)
      .toUpperCase();

    return {
      id: docSnap.id,
      title,
      initials: initials || "C",
      meta: data.meta || "Updated recently",
      category: data.category || "General",

      price:
        data.price !== undefined && data.price !== null
          ? `NPR ${Number(data.price).toLocaleString("en-NP")}`
          : "NPR 0",

      students: Number(data.students || 0),
      rating: data.rating || "—",
      status: data.status || "Draft",

      // Preserve both fields for edit/delete operations.
      imageUrl: data.imageUrl || "",
      imageFileId: data.imageFileId || "",
      imageFolder: data.imageFolder || "/courses",
    };
  });
}

/**
 * Fetch a single course by document ID.
 *
 * Used by app/admin/courses/[id]/edit/page.tsx.
 */
export async function fetchCourseById(
  courseId: string,
): Promise<CourseRecord | null> {
  if (!courseId.trim()) {
    throw new Error("Course ID is required.");
  }

  const courseRef = doc(
    getCoursesDb(),
    COLLECTION_NAME,
    courseId,
  );

  const courseSnap = await getDoc(courseRef);

  if (!courseSnap.exists()) {
    return null;
  }

  return {
    ...courseSnap.data(),
    id: courseSnap.id,
  } as CourseRecord;
}

/**
 * Create a course.
 *
 * The image must already have been uploaded to ImageKit.
 * This function saves the returned URL and file ID to Firestore.
 * If the Firestore write fails, it attempts to remove the new upload.
 */
export async function createCourseInDb(
  courseData: CoursePayload,
): Promise<string> {
  const imageUrl = courseData.imageUrl || "";
  const imageFileId = courseData.imageFileId || "";

  if (imageUrl && !imageFileId) {
    throw new Error(
      "Cannot save the course image without its ImageKit file ID.",
    );
  }

  try {
    const docRef = await addDoc(getCoursesCollection(), {
      ...courseData,

      students: courseData.students ?? 0,
      rating: courseData.rating ?? "—",
      meta: courseData.meta ?? "Created just now",

      imageUrl,
      imageFileId,
      imageFolder: courseData.imageFolder ?? "/courses",

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return docRef.id;
  } catch (error) {
    // The image was uploaded before this Firestore write.
    // Avoid leaving it behind if course creation fails.
    if (imageFileId) {
      try {
        await deleteImageKitFile(imageFileId);
      } catch (cleanupError) {
        console.error(
          "Course creation failed and its uploaded ImageKit image could not be cleaned up:",
          cleanupError,
        );
      }
    }

    throw error;
  }
}

/**
 * Update an existing course and its ImageKit image reference.
 *
 * Image replacement:
 * 1. Read the old URL and old file ID.
 * 2. Validate the incoming image fields.
 * 3. Save the new course data to Firestore.
 * 4. Delete the previous ImageKit asset using its OLD file ID.
 *
 * Image removal:
 * Pass imageUrl: "" and imageFileId: "" (or only imageUrl: "").
 */
export async function updateCourseInDb(
  courseId: string,
  courseData: Partial<CoursePayload>,
): Promise<void> {
  if (!courseId.trim()) {
    throw new Error("Course ID is required.");
  }

  const db = getCoursesDb();
  const courseRef = doc(db, COLLECTION_NAME, courseId);

  // Read existing data BEFORE modifying the document.
  const existingSnap = await getDoc(courseRef);

  if (!existingSnap.exists()) {
    throw new Error("Course not found.");
  }

  const existingData = existingSnap.data();

  const oldImageUrl =
    typeof existingData.imageUrl === "string"
      ? existingData.imageUrl
      : "";

  const oldImageFileId =
    typeof existingData.imageFileId === "string"
      ? existingData.imageFileId
      : "";

  const hasImageUrl = Object.prototype.hasOwnProperty.call(
    courseData,
    "imageUrl",
  );

  const hasImageFileId = Object.prototype.hasOwnProperty.call(
    courseData,
    "imageFileId",
  );

  // Keep the existing values when the update does not include image fields.
  let nextImageUrl = hasImageUrl
    ? typeof courseData.imageUrl === "string"
      ? courseData.imageUrl
      : ""
    : oldImageUrl;

  let nextImageFileId = hasImageFileId
    ? typeof courseData.imageFileId === "string"
      ? courseData.imageFileId
      : ""
    : oldImageFileId;

  const imageUpdateRequested = hasImageUrl || hasImageFileId;

  let imageChanged =
    nextImageUrl !== oldImageUrl ||
    nextImageFileId !== oldImageFileId;

  if (imageUpdateRequested && imageChanged) {
    const removingImage = !nextImageUrl || !nextImageFileId;

    if (removingImage) {
      // Removing either side clears both Firestore image references.
      nextImageUrl = "";
      nextImageFileId = "";
    } else {
      // A new URL and file ID must describe the same new asset.
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

      if (
        nextImageFileId !== oldImageFileId &&
        (!hasImageUrl || nextImageUrl === oldImageUrl)
      ) {
        throw new Error(
          "The ImageKit file ID changed without a matching new image URL.",
        );
      }
    }
  }

  const updatedData: Record<string, unknown> = {
    ...courseData,
    updatedAt: new Date().toISOString(),
  };

  // Persist consistent image fields when either is updated.
  if (imageUpdateRequested) {
    updatedData.imageUrl = nextImageUrl;
    updatedData.imageFileId = nextImageFileId;

    if (courseData.imageFolder !== undefined) {
      updatedData.imageFolder = courseData.imageFolder;
    }
  }

  // Write Firestore first so the document references the new image.
  await updateDoc(courseRef, updatedData);

  // After the write succeeds, clean up the PREVIOUS ImageKit asset.
  const oldImageMustBeDeleted =
    Boolean(oldImageFileId) &&
    oldImageFileId !== nextImageFileId &&
    imageChanged;

  if (oldImageMustBeDeleted) {
    try {
      await deleteImageKitFile(oldImageFileId);
      console.info(
        "Deleted previous ImageKit image:",
        oldImageFileId,
      );
    } catch (error) {
      // Firestore is already saved. Make that distinction clear.
      console.error(
        "The course was saved, but the previous ImageKit image remains:",
        {
          courseId,
          oldImageFileId,
          newImageFileId: nextImageFileId,
          error,
        },
      );

      throw new Error(
        `The course was saved successfully, but deletion of the old ImageKit image failed. Old file ID: ${oldImageFileId}. Check the /api/delete-auth server error.`,
      );
    }
  }
}

/**
 * Delete a course and its ImageKit asset.
 *
 * The image is deleted first. If ImageKit deletion fails, the Firestore
 * document is retained so that the operation can be retried.
 */
export async function deleteCourseFromDb(
  courseId: string,
): Promise<void> {
  if (!courseId.trim()) {
    throw new Error("Course ID is required.");
  }

  const db = getCoursesDb();
  const courseRef = doc(db, COLLECTION_NAME, courseId);

  const courseSnap = await getDoc(courseRef);

  if (!courseSnap.exists()) {
    throw new Error("Course not found.");
  }

  const data = courseSnap.data();

  const imageUrl =
    typeof data.imageUrl === "string" ? data.imageUrl : "";

  const imageFileId =
    typeof data.imageFileId === "string"
      ? data.imageFileId
      : "";

  // Delete the associated ImageKit asset first.
  // If this fails, keep the course record so the user can retry.
  if (imageFileId) {
    await deleteImageKitFile(imageFileId);
  } else if (imageUrl) {
    console.warn(
      "This course has an image URL but no imageFileId. The image cannot be deleted automatically.",
      courseId,
    );
  }

  try {
    await deleteDoc(courseRef);
  } catch (error) {
    // If Firestore deletion fails after the asset was removed,
    // avoid leaving a reference to the removed image if possible.
    if (imageFileId) {
      try {
        await updateDoc(courseRef, {
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
