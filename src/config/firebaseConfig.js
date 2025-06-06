// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmaKk8gia1QXolLCCoLQBcQkmai0RzQFI",
  authDomain: "kudumart-c0b78.firebaseapp.com",
  projectId: "kudumart-c0b78",
  storageBucket: "kudumart-c0b78.firebasestorage.app",
  messagingSenderId: "142182317218",
  appId: "1:142182317218:web:c03e5138f070a889c6abfb",
  measurementId: "G-3VN1RL0PE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };

