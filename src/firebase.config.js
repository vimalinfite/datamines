// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyjN6a6JaHPth0oYrrzcU_gaW9_a6ds_I",
  authDomain: "ocr-business-129bb.firebaseapp.com",
  projectId: "ocr-business-129bb",
  storageBucket: "ocr-business-129bb.appspot.com",
  messagingSenderId: "825650624597",
  appId: "1:825650624597:web:d04847bc7f606eea763cdc",
  measurementId: "G-01NTEVE4EZ"
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);