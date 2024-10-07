// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp9-YpuTObY6H9INSKrwybQo90Azvek9E",
  authDomain: "langroove.firebaseapp.com",
  projectId: "langroove",
  storageBucket: "langroove.appspot.com",
  messagingSenderId: "259768200987",
  appId: "1:259768200987:web:c929813e23c6ed32a2edbe",
  measurementId: "G-KCJMS7G5CE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);