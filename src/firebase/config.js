import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDskXL89P4RgLGUwb290Vao-4DMjQh8ONg",
  authDomain: "tuku-legacy.firebaseapp.com",
  projectId: "tuku-legacy",
  storageBucket: "tuku-legacy.firebasestorage.app",
  messagingSenderId: "486049454968",
  appId: "1:486049454968:web:ca81e8cc7ca9dbd3eb868d",
  measurementId: "G-4TG4KDL5Y1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
