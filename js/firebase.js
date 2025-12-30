// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0qUi0zg0IgSOuNckMI5ZNMPZIK6-cEDw",
  authDomain: "digital-e-gram-panchayat-93a6a.firebaseapp.com",
  projectId: "digital-e-gram-panchayat-93a6a",
  storageBucket: "digital-e-gram-panchayat-93a6a.firebasestorage.app",
  messagingSenderId: "14197800588",
  appId: "1:14197800588:web:19ec208820e6708ba245a9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
