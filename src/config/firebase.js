import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjLNyUEHwbnFMKLJwpyIPLef4kv9kvL3w",
  authDomain: "pasarsekawan.firebaseapp.com",
  projectId: "pasarsekawan",
  storageBucket: "pasarsekawan.appspot.com",
  messagingSenderId: "96502566957",
  appId: "1:96502566957:web:a380c5eb8826a9ca2528a4",
  measurementId: "G-MTV76GTZF3",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
