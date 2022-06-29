import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZRQqZXBgNV6KQ-Xhc3IfsfwKfRZzn31w",
  authDomain: "ajoin-whatsapp.firebaseapp.com",
  projectId: "ajoin-whatsapp",
  storageBucket: "ajoin-whatsapp.appspot.com",
  messagingSenderId: "200072277864",
  appId: "1:200072277864:web:0de26c645b2e94b3d6b0dd",
  measurementId: "G-7S6Q0H0FKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
auth.languageCode = 'en';

const provider = new GoogleAuthProvider();


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, provider };

export default db;