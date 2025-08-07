// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3NE14XhJiGFRQNCfIpEcZhDn40cbzhyw",
  authDomain: "crave-demo-3d6a0.firebaseapp.com",
  projectId: "crave-demo-3d6a0",
  storageBucket: "crave-demo-3d6a0.firebasestorage.app",
  messagingSenderId: "980182343458",
  appId: "1:980182343458:web:563df32d756b3c2b044f7b",
  measurementId: "G-W6WK56JY67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);