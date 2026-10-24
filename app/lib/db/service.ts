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

const COLLECTION_NAME = "services";

/**
 * Use the existing Firebase app and Firestore instance.
 */
function getServicesDb() {
  return getFirestore(getFirebaseApp());
}

function getServicesCollection() {
  return collection(getServicesDb(), COLLECTION_NAME);
}

export type ServicePayload = {
  title: string;
  category: string;
  description: string;
  price: number | null;
  pricingType: "Starting at" | "Fixed" | "Custom";
  status: "Published" | "Draft";
  features?: string[];

  // ImageKit
  imageUrl?: string;
  imageFileId?: string;
  imageFolder?: string;

  icon?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ServiceRecord = ServicePayload & {
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
 * Fetch all services for the admin listing.
 */
export async function getAllServices(): Promise<ServiceRecord[]> {
  const querySnapshot = await getDocs(getServicesCollection());

  return querySnapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      title: String(data.title || ""),
      category: String(data.category || ""),
      description: String(data.description || ""),
      price:
        data.price !== undefined && data.price !== null
          ? Number(data.price)
          : null,
      pricingType: data.pricingType || "Starting at",
      status: data.status || "Draft",
      features: Array.isArray(data.features) ? data.features : [],
      imageUrl: data.imageUrl || "",
      imageFileId: data.imageFileId || "",
      imageFolder: data.imageFolder || "/service",
      icon: data.icon || "",
    };
  });
}

/**
 * Fetch a single service by document ID[cite: 10].
 */
export async function getService(
  serviceId: string,
): Promise<ServiceRecord | null> {
  if (!serviceId.trim()) {
    throw new Error("Service ID is required.");
  }

  const serviceRef = doc(
    getServicesDb(),
    COLLECTION_NAME,
    serviceId,
  );

  const docSnap = await getDoc(serviceRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    ...docSnap.data(),
    id: docSnap.id,
  } as ServiceRecord;
}

/**
 * Create a service[cite: 10].
 * Cleans up the uploaded ImageKit image if the Firestore write fails.
 */
export async function createServiceInDb(
  serviceData: ServicePayload,
): Promise<string> {
  const imageUrl = serviceData.imageUrl || "";
  const imageFileId = serviceData.imageFileId || "";

  if (imageUrl && !imageFileId) {
    throw new Error(
      "Cannot save the service image without its ImageKit file ID.",
    );
  }

  try {
    const docRef = await addDoc(getServicesCollection(), {
      ...serviceData,
      imageUrl,
      imageFileId,
      imageFolder: serviceData.imageFolder ?? "/service",
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
          "Service creation failed and its uploaded ImageKit image could not be cleaned up:",
          cleanupError,
        );
      }
    }

    throw error;
  }
}

/**
 * Update an existing service and its ImageKit image reference[cite: 10].
 */
export async function updateServiceInDb(
  serviceId: string,
  serviceData: Partial<ServicePayload>,
): Promise<void> {
  if (!serviceId.trim()) {
    throw new Error("Service ID is required.");
  }

  const db = getServicesDb();
  const serviceRef = doc(db, COLLECTION_NAME, serviceId);

  const existingSnap = await getDoc(serviceRef);

  if (!existingSnap.exists()) {
    throw new Error("Service not found.");
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
    serviceData,
    "imageUrl",
  );

  const hasImageFileId = Object.prototype.hasOwnProperty.call(
    serviceData,
    "imageFileId",
  );

  let nextImageUrl = hasImageUrl
    ? typeof serviceData.imageUrl === "string"
      ? serviceData.imageUrl
      : ""
    : oldImageUrl;

  let nextImageFileId = hasImageFileId
    ? typeof serviceData.imageFileId === "string"
      ? serviceData.imageFileId
      : ""
    : oldImageFileId;

  const imageUpdateRequested = hasImageUrl || hasImageFileId;
  const imageChanged =
    nextImageUrl !== oldImageUrl ||
    nextImageFileId !== oldImageFileId;

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
    ...serviceData,
    updatedAt: new Date().toISOString(),
  };

  if (imageUpdateRequested) {
    updatedData.imageUrl = nextImageUrl;
    updatedData.imageFileId = nextImageFileId;

    if (serviceData.imageFolder !== undefined) {
      updatedData.imageFolder = serviceData.imageFolder;
    }
  }

  await updateDoc(serviceRef, updatedData);

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
      console.error(
        "The service was saved, but the previous ImageKit image remains:",
        {
          serviceId,
          oldImageFileId,
          newImageFileId: nextImageFileId,
          error,
        },
      );

      throw new Error(
        `The service was saved successfully, but deletion of the old ImageKit image failed. Old file ID: ${oldImageFileId}.`,
      );
    }
  }
}

/**
 * Delete a service and its ImageKit asset[cite: 10].
 */
export async function deleteServiceFromDb(
  serviceId: string,
): Promise<void> {
  if (!serviceId.trim()) {
    throw new Error("Service ID is required.");
  }

  const db = getServicesDb();
  const serviceRef = doc(db, COLLECTION_NAME, serviceId);

  const serviceSnap = await getDoc(serviceRef);

  if (!serviceSnap.exists()) {
    throw new Error("Service not found.");
  }

  const data = serviceSnap.data();

  const imageUrl =
    typeof data.imageUrl === "string" ? data.imageUrl : "";

  const imageFileId =
    typeof data.imageFileId === "string"
      ? data.imageFileId
      : "";

  if (imageFileId) {
    await deleteImageKitFile(imageFileId);
  } else if (imageUrl) {
    console.warn(
      "This service has an image URL but no imageFileId. The image cannot be deleted automatically.",
      serviceId,
    );
  }

  try {
    await deleteDoc(serviceRef);
  } catch (error) {
    if (imageFileId) {
      try {
        await updateDoc(serviceRef, {
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
 * Backward compatibility helper wrapper for existing service forms.
 */
export async function saveService(
  id: string | null,
  data: ServicePayload,
): Promise<string> {
  if (id) {
    await updateServiceInDb(id, data);
    return id;
  } else {
    return await createServiceInDb(data);
  }
}