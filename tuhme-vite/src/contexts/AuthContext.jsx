import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please check your credentials.');
      return false;
    }
  };

  // Register with email and password
  const register = async (email, password, displayName) => {
    try {
      setError('');
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(user, { displayName });
      
      // Send email verification
      await sendEmailVerification(user);
      
      // Create user profile document in Firestore
      await setDoc(doc(db, 'userProfiles', user.uid), {
        uid: user.uid,
        displayName,
        email,
        createdAt: new Date().toISOString(),
        phoneNumber: '',
        deliveryAddresses: [],
        preferredStores: [],
        notificationPreferences: {
          email: true,
          push: false
        }
      });
      
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again later.');
      return false;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out. Please try again.');
      return false;
    }
  };

  // Fetch user profile data from Firestore
  const fetchUserProfile = async (userId) => {
    try {
      const docRef = doc(db, 'userProfiles', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
        return docSnap.data();
      } else {
        console.log('No user profile found');
        return null;
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      return null;
    }
  };

  // Update user profile in Firestore
  const updateUserProfile = async (profileData) => {
    try {
      if (!currentUser) return false;
      
      await setDoc(doc(db, 'userProfiles', currentUser.uid), 
        { ...profileData, updatedAt: new Date().toISOString() }, 
        { merge: true }
      );
      
      // Update local state
      setUserProfile(prevProfile => ({
        ...prevProfile,
        ...profileData
      }));
      
      return true;
    } catch (err) {
      console.error('Error updating user profile:', err);
      setError('Failed to update profile. Please try again.');
      return false;
    }
  };

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user profile when authenticated
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    register,
    logout,
    updateUserProfile,
    error,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;