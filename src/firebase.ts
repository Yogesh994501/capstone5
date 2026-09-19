import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoKeyFallbackForPreview',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'verdant-core.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'verdant-core',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'verdant-core.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

// Initialize Firebase App instance safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
