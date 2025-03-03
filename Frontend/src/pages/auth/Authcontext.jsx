import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { auth, db } from "./Firebase"; // Import db from Firebase
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from 'prop-types';

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // For authentication
  const [roleLoading, setRoleLoading] = useState(true); // For role fetching

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserRole(currentUser); // Fetch user role
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (currentUser) => {
    if (currentUser) {
      setRoleLoading(true); // Start loading the role
      try {
        const userDocRef = doc(db, "users", currentUser.uid);  // Assuming 'users' collection and 'uid' is the document ID
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const role = userDoc.data().role;  // Assuming 'role' is a field in the user's Firestore document
          console.log("User role: ", role);
          setUserRole(role);
        } else {
          console.log("User not found in Firestore.");
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole(null);
      } finally {
        setRoleLoading(false); // Stop loading the role
      }
    }
  };

  // Use useMemo to stabilize the context value
  const contextValue = useMemo(
    () => ({ user, setUser, userRole, setUserRole, loading, roleLoading }),
    [user, userRole, loading, roleLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
