// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjKOZydtbcJ_ieIr4Aebn5yTSkT_Msv2g",
  authDomain: "tuhme-22ee9.firebaseapp.com",
  projectId: "tuhme-22ee9",
  storageBucket: "tuhme-22ee9.firebasestorage.app",
  messagingSenderId: "131350866531",
  appId: "1:131350866531:web:39470ff40dced049276656",
  measurementId: "G-T012PR80ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };