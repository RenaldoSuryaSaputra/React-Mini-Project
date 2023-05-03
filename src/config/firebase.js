import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBwwP85_zR6IJqUsJ00z2xZRq9satPsQb4",
  authDomain: "react-pasar-sekawan.firebaseapp.com",
  projectId: "react-pasar-sekawan",
  storageBucket: "react-pasar-sekawan.appspot.com",
  messagingSenderId: "441099378054",
  appId: "1:441099378054:web:d2cdf76eb98d28f4bda007",
  measurementId: "G-YDMS3F1V22"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
