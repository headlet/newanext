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

const COLLECTION_NAME = "products";

/**
 * Use the existing Firebase app and Firestore instance.
 */
function getProductsDb() {
  return getFirestore(getFirebaseApp());
}

function getProductsCollection() {
  return collection(getProductsDb(), COLLECTION_NAME);
}

export type ProductPayload = {
  name: string;
  slug: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  stock: number;
  status: string;

  // ImageKit fields
  imageUrl?: string;
  imageFileId?: string;
  imageFolder?: string;

  // Legacy fallback fields support
  image?: string;
  imageName?: string;

  createdAt?: string;
  updatedAt?: string;
};

export type ProductRecord = ProductPayload & {
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
 * Fetch all products for admin listing.
 */
export async function getAllProducts(): Promise<ProductRecord[]> {
  const querySnapshot = await getDocs(getProductsCollection());

  return querySnapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    const resolvedImageUrl = data.imageUrl || data.image || "";

    return {
      id: docSnap.id,
      name: String(data.name || "Untitled Product"),
      slug: String(data.slug || ""),
      sku: String(data.sku || "N/A"),
      category: String(data.category || "General"),
      price: Number(data.price) || 0,
      comparePrice: data.comparePrice !== undefined ? data.comparePrice : null,
      stock: Number(data.stock) || 0,
      status: String(data.status || "Draft"),
      imageUrl: resolvedImageUrl,
      imageFileId: String(data.imageFileId || ""),
      imageFolder: String(data.imageFolder || "/products"),
      image: resolvedImageUrl,
      imageName: String(data.imageName || ""),
    };
  });
}

/**
 * Fetch single product by ID[cite: 10].
 */
export async function fetchProductById(
  productId: string,
): Promise<ProductRecord | null> {
  if (!productId.trim()) {
    throw new Error("Product ID is required.");
  }

  const productRef = doc(
    getProductsDb(),
    COLLECTION_NAME,
    productId,
  );

  const docSnap = await getDoc(productRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  const resolvedImageUrl = data.imageUrl || data.image || "";

  return {
    ...data,
    id: docSnap.id,
    imageUrl: resolvedImageUrl,
    image: resolvedImageUrl,
    imageFileId: data.imageFileId || "",
    imageFolder: data.imageFolder || "/products",
  } as ProductRecord;
}

/**
 * Create a new product[cite: 10].
 * Cleans up the uploaded ImageKit image if the Firestore write fails.
 */
export async function createProductInDb(
  productData: ProductPayload,
): Promise<string> {
  const imageUrl = productData.imageUrl || productData.image || "";
  const imageFileId = productData.imageFileId || "";

  if (imageUrl && !imageFileId) {
    throw new Error(
      "Cannot save the product image without its ImageKit file ID.",
    );
  }

  try {
    const docRef = await addDoc(getProductsCollection(), {
      ...productData,
      imageUrl,
      image: imageUrl,
      imageFileId,
      imageFolder: productData.imageFolder ?? "/products",
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
          "Product creation failed and its uploaded ImageKit image could not be cleaned up:",
          cleanupError,
        );
      }
    }

    throw error;
  }
}

/**
 * Update an existing product and its ImageKit image reference[cite: 10].
 */
export async function updateProductInDb(
  productId: string,
  productData: Partial<ProductPayload>,
): Promise<void> {
  if (!productId.trim()) {
    throw new Error("Product ID is required.");
  }

  const db = getProductsDb();
  const productRef = doc(db, COLLECTION_NAME, productId);

  const existingSnap = await getDoc(productRef);

  if (!existingSnap.exists()) {
    throw new Error("Product not found.");
  }

  const existingData = existingSnap.data();

  const oldImageUrl =
    typeof existingData.imageUrl === "string"
      ? existingData.imageUrl
      : typeof existingData.image === "string"
      ? existingData.image
      : "";

  const oldImageFileId =
    typeof existingData.imageFileId === "string"
      ? existingData.imageFileId
      : "";

  const hasImageUrl =
    Object.prototype.hasOwnProperty.call(productData, "imageUrl") ||
    Object.prototype.hasOwnProperty.call(productData, "image");

  const hasImageFileId = Object.prototype.hasOwnProperty.call(
    productData,
    "imageFileId",
  );

  const incomingImage = productData.imageUrl || productData.image;

  let nextImageUrl = hasImageUrl
    ? typeof incomingImage === "string"
      ? incomingImage
      : ""
    : oldImageUrl;

  let nextImageFileId = hasImageFileId
    ? typeof productData.imageFileId === "string"
      ? productData.imageFileId
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
    ...productData,
    updatedAt: new Date().toISOString(),
  };

  if (imageUpdateRequested) {
    updatedData.imageUrl = nextImageUrl;
    updatedData.image = nextImageUrl;
    updatedData.imageFileId = nextImageFileId;

    if (productData.imageFolder !== undefined) {
      updatedData.imageFolder = productData.imageFolder;
    }
  }

  await updateDoc(productRef, updatedData);

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
        "The product was saved, but the previous ImageKit image remains:",
        {
          productId,
          oldImageFileId,
          newImageFileId: nextImageFileId,
          error,
        },
      );

      throw new Error(
        `The product was saved successfully, but deletion of the old ImageKit image failed. Old file ID: ${oldImageFileId}.`,
      );
    }
  }
}

/**
 * Delete a product and its ImageKit asset[cite: 10].
 */
export async function deleteProductFromDb(
  productId: string,
): Promise<void> {
  if (!productId.trim()) {
    throw new Error("Product ID is required.");
  }

  const db = getProductsDb();
  const productRef = doc(db, COLLECTION_NAME, productId);

  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    throw new Error("Product not found.");
  }

  const data = productSnap.data();

  const imageUrl =
    typeof data.imageUrl === "string"
      ? data.imageUrl
      : typeof data.image === "string"
      ? data.image
      : "";

  const imageFileId =
    typeof data.imageFileId === "string"
      ? data.imageFileId
      : "";

  if (imageFileId) {
    await deleteImageKitFile(imageFileId);
  } else if (imageUrl) {
    console.warn(
      "This product has an image URL but no imageFileId. The image cannot be deleted automatically.",
      productId,
    );
  }

  try {
    await deleteDoc(productRef);
  } catch (error) {
    if (imageFileId) {
      try {
        await updateDoc(productRef, {
          imageUrl: "",
          image: "",
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