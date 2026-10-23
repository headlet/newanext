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
  image?: string;
  imageName?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Fetch all products
export async function getAllProducts() {
  const db = getFirestore(getFirebaseApp());
  const querySnapshot = await getDocs(collection(db, "products"));

  const products: any[] = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    products.push({
      id: docSnap.id,
      name: data.name || "Untitled Product",
      slug: data.slug || "",
      sku: data.sku || "N/A",
      category: data.category || "General",
      price: Number(data.price) || 0,
      comparePrice: data.comparePrice || null,
      stock: Number(data.stock) || 0,
      status: data.status || "Draft",
      image: data.image || "",
    });
  });

  return products;
}

// Fetch single product by ID
export async function fetchProductById(productId: string) {
  const db = getFirestore(getFirebaseApp());
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

// Create new product
export async function createProductInDb(productData: ProductPayload) {
  const db = getFirestore(getFirebaseApp());
  const docRef = await addDoc(collection(db, "products"), {
    ...productData,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

// Update existing product
export async function updateProductInDb(productId: string, productData: Partial<ProductPayload>) {
  const db = getFirestore(getFirebaseApp());
  const docRef = doc(db, "products", productId);
  await updateDoc(docRef, {
    ...productData,
    updatedAt: new Date().toISOString(),
  });
}

// Delete product
export async function deleteProductFromDb(productId: string) {
  const db = getFirestore(getFirebaseApp());
  await deleteDoc(doc(db, "products", productId));
}