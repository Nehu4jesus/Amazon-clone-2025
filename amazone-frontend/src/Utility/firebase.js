// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkoDBvg2JhsicQLQYRGJRlkH5QuXankjA",
  authDomain: "clone-7f005.firebaseapp.com",
  projectId: "clone-7f005",
  storageBucket: "clone-7f005.firebasestorage.app",
  messagingSenderId: "4409795288",
  appId: "1:4409795288:web:e228b344ac157f2c49edad",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore;
