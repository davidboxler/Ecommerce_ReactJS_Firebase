import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut
} from "firebase/auth";
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch
} from "firebase/firestore";

import { Category } from "../store/categories/category.types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbIezTO6AFy_aoza4ocWHOrguCtJi7svM",
  authDomain: "crwn-tienda-ropa.firebaseapp.com",
  projectId: "crwn-tienda-ropa",
  storageBucket: "crwn-tienda-ropa.appspot.com",
  messagingSenderId: "40880826259",
  appId: "1:40880826259:web:8da8d272c989e92f95aa66",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
  title: string
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[],
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category)
};

export type AdditionalInformation = {
  displayName?: string
}

export type UserData = {
  createdAt: Date,
  displayName: string,
  email: string
}

export const createUserDocumentFromAuth = async (
  userAuth: User,
  aditionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...aditionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const singInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

  export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth, 
        (userAuth) => {
          unsubscribe()
          resolve(userAuth)
        },
        reject
      )
    })
  }