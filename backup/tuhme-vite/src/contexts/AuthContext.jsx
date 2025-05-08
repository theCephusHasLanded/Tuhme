import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out. Please try again.');
      return false;
    }
  };

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
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