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
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-vVyvvLe3ZnkRFIWA6Y7u5hsF9vSK57Y",
  authDomain: "crwn20221101.firebaseapp.com",
  projectId: "crwn20221101",
  storageBucket: "crwn20221101.appspot.com",
  messagingSenderId: "837683150684",
  appId: "1:837683150684:web:3d5ea42ebf9cef850fcb99",
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

export const signOutUser = async () => await signOut(auth);

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

export const getAllCategoriesAndDocuments = async () => {
  const searchQuery = query(collection(db, "categories"));

  const querySnapshot = await getDocs(searchQuery);

  return querySnapshot.docs.map((doc) => doc.data());
};

export const getCurrentUser = async (userDocRef) => {
  const userSnapshot = await getDoc(userDocRef);

  return userSnapshot.data();
};
