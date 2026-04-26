'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchProfile(user.uid);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setupRecaptcha = (containerId) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved
        }
      });
    }
  };

  const signInWithPhone = async (phoneNumber, containerId) => {
    setupRecaptcha(containerId);
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return confirmationResult;
    } catch (error) {
      console.error('Phone sign in error:', error);
      throw error;
    }
  };

  const signInWithGoogle = async (role = 'user') => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      let userProfile = null;
      if (!docSnap.exists()) {
        const name = user.displayName || (user.email ? user.email.split('@')[0] : 'New User');
        userProfile = await createUserProfile(user.uid, user.phoneNumber || user.email, role, {
          displayName: name,
          email: user.email,
          photoURL: user.photoURL
        });
      } else {
        userProfile = docSnap.data();
        setProfile(userProfile);
      }
      return { user, profile: userProfile };
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email, password, displayName, role = 'user') => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      const name = displayName || email.split('@')[0];
      
      await updateProfile(user, { displayName: name });
      
      const userProfile = await createUserProfile(user.uid, null, role, {
        displayName: name,
        email: user.email,
        photoURL: user.photoURL
      });
      
      return { user, profile: userProfile };
    } catch (error) {
      console.error('Email sign up error:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error('Email sign in error:', error);
      throw error;
    }
  };

  const createUserProfile = async (uid, phoneNumber, role, additionalData = {}) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        const userData = {
          uid,
          phoneNumber,
          role,
          createdAt: serverTimestamp(),
          ...additionalData
        };
        await setDoc(docRef, userData);
        setProfile(userData);
        return userData;
      } else {
        const existingData = docSnap.data();
        setProfile(existingData);
        return existingData;
      }
    } catch (error) {
      console.error('Error in profile operation:', error);
      throw error;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value = {
    user,
    profile,
    signInWithPhone,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    createUserProfile,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
