// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  query,
  getDocs,
  where,
  limit,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = async () =>
  signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: new Date(),
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error in creating account on firestore");
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
  window.localStorage.removeItem("persist:root");
};

export const onAuthStateChangedListerner = (callback) =>
  onAuthStateChanged(auth, callback);

// initialize shop data to firestore
export const addNewCollectionsAndDocuments = async (
  collectionKey,
  shopCategories
) => {
  const batch = writeBatch(db);

  shopCategories.forEach((shopCategory) => {
    const docRef = doc(db, collectionKey, shopCategory.title.toLowerCase());
    batch.set(docRef, shopCategory);
  });

  await batch.commit();
};
export const batchInitialShopsData = async (collectionKey, shopDataArray) => {
  const batch = writeBatch(db);

  shopDataArray.forEach((item) => {
    const docRef = doc(db, collectionKey, item.id.toLowerCase());
    batch.set(docRef, item);
  });

  await batch.commit();
};

export const getCategoriesPreview = async () => {
  const productRef = collection(db, "products");
  const categoryQuery = (category) =>
    query(productRef, where("category", "==", category), limit(4));

  const mensSnapshot = await getDocs(categoryQuery("Mens"));
  const womensSnapshot = await getDocs(categoryQuery("Womens"));
  const jacketsSnapshot = await getDocs(categoryQuery("Jackets"));
  const hatsSnapshot = await getDocs(categoryQuery("Hats"));
  const sneakersSnapshot = await getDocs(categoryQuery("Sneakers"));

  const getData = (snapshot) => {
    let collection = {};

    snapshot.forEach((item) => {
      const data = item.data();
      if (!collection.category) {
        collection.category = data.category;
        collection.items = [data];
      } else {
        collection.items.push(data);
      }
    });

    return collection;
  };

  return [
    getData(mensSnapshot),
    getData(womensSnapshot),
    getData(jacketsSnapshot),
    getData(hatsSnapshot),
    getData(sneakersSnapshot),
  ];
};

export const getAllProductsInCategory = async (categoryTitle) => {
  const q = query(
    collection(db, "products"),
    where("category", "==", categoryTitle)
  );

  const categorySnapshot = await getDocs(q);

  return categorySnapshot.docs.map((item) => item.data());
};

export const getAllCategoriesAndDocuments = async () => {
  const searchQuery = query(collection(db, "categories"));

  const querySnapshot = await getDocs(searchQuery);

  return querySnapshot.docs.map((doc) => doc.data());
};

export const getCurrentUser = async (userDocRef) => {
  const userSnapshot = await getDoc(userDocRef);

  return userSnapshot.data();
};
