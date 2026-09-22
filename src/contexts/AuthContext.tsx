import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInAnonymously
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useAppStore } from '../stores/appStore';

interface AuthContextValue {
  signInWithGoogle: () => Promise<boolean>;
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<boolean>;
  signInWithEmail: (email: string, pass: string) => Promise<boolean>;
  signInAsGuest: () => Promise<boolean>;
  signOut: () => Promise<void>;
  authError: string | null;
  setAuthError: (err: string | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const setUser = useAppStore((s) => s.setUser);
  const setAuthLoading = useAppStore((s) => s.setAuthLoading);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setAuthLoading]);

  const mapAuthError = (code: string, fallback: string): string => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please verify your credentials.';
      case 'auth/popup-closed-by-user':
        return 'Google Sign-in popup was closed before completing.';
      case 'auth/network-request-failed':
        return 'Network connection error. Please check your internet connection.';
      default:
        return fallback || 'Authentication failed. Please try again.';
    }
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      setLoading(false);
      return true;
    } catch (error: any) {
      setLoading(false);
      if (error.code !== 'auth/popup-closed-by-user') {
        setAuthError(mapAuthError(error.code, error.message));
      }
      return false;
    }
  };

  const signUpWithEmail = async (name: string, email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (name.trim()) {
        await updateProfile(userCredential.user, { displayName: name.trim() });
        // Force refresh user state in store
        setUser({ ...userCredential.user, displayName: name.trim() });
      }
      setLoading(false);
      return true;
    } catch (error: any) {
      setLoading(false);
      setAuthError(mapAuthError(error.code, error.message));
      return false;
    }
  };

  const signInWithEmail = async (email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
      setLoading(false);
      return true;
    } catch (error: any) {
      setLoading(false);
      setAuthError(mapAuthError(error.code, error.message));
      return false;
    }
  };

  const signInAsGuest = async (): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await signInAnonymously(auth);
      await updateProfile(res.user, { displayName: 'Organic Explorer (Guest)' });
      setUser({ ...res.user, displayName: 'Organic Explorer (Guest)' });
      setLoading(false);
      return true;
    } catch (error: any) {
      setLoading(false);
      setAuthError(mapAuthError(error.code, error.message));
      return false;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      signInWithGoogle, 
      signUpWithEmail, 
      signInWithEmail, 
      signInAsGuest, 
      signOut, 
      authError, 
      setAuthError, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
