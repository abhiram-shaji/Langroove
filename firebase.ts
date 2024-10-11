//firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistence
import { getFirestore } from "firebase/firestore"; // Example for Firestore database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp9-YpuTObY6H9INSKrwybQo90Azvek9E",
  authDomain: "langroove.firebaseapp.com",
  projectId: "langroove",
  storageBucket: "langroove.appspot.com",
  messagingSenderId: "259768200987",
  appId: "1:259768200987:web:c929813e23c6ed32a2edbe",
  measurementId: "G-KCJMS7G5CE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db }; // Export the initialized services
