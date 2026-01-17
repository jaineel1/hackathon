// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdcxP-tfV1YE2nRsllPv59F6Bnn3Cvtk8",
    authDomain: "skill-intelligence-5d5c6.firebaseapp.com",
    projectId: "skill-intelligence-5d5c6",
    storageBucket: "skill-intelligence-5d5c6.firebasestorage.app",
    messagingSenderId: "1046108634118",
    appId: "1:1046108634118:web:d60234c7501642d2e7d787",
    measurementId: "G-EHVNMYY1F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
