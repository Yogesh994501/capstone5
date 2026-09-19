import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBLLHUDBnqjV07mb50QRuEJsXRbdEmbMGE',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'freshcart-demo-42425.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'freshcart-demo-42425',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'freshcart-demo-42425.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '332817351186',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:332817351186:web:3b78727db644ee48208ecb',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-FW8PN9BTNM',
};

// Initialize Firebase App instance safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
