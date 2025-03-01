import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from 'prop-types';

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user role from Firestore or backend if needed
        fetchUserRole(currentUser.uid);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Example function to fetch user role
  const fetchUserRole = async (uid) => {
    try {
      // Replace this with actual Firestore or API call
      const role = "User"; // Fetch role from Firestore based on UID
      setUserRole(role);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  // Use useMemo to stabilize the context value
  const contextValue = useMemo(
    () => ({ user, setUser, userRole, setUserRole, loading }),
    [user, userRole, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Add prop validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};