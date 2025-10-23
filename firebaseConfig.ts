import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3TZIlcnGx-cAk7lnjoHk2D6CvWqEFHjM",
  authDomain: "lyriclab-6b468.firebaseapp.com",
  projectId: "lyriclab-6b468",
  storageBucket: "lyriclab-6b468.firebasestorage.app",
  messagingSenderId: "288206059813",
  appId: "1:288206059813:web:d58f2a00ffe184634c42cc",
  measurementId: "G-Y6Y87M4HVB"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;