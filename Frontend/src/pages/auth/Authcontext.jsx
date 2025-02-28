import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase"; // Adjust the path
import PropTypes from "prop-types"; // Import PropTypes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // Add userRole state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          // Fetch user role from your backend or Firebase
          const response = await fetch(`http://localhost:5000/api/user/${user.uid}`);
          const data = await response.json();
          setUserRole(data.role); // Set the user's role
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUserRole(null); // Reset role if no user is logged in
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Memoize the value object to prevent unnecessary re-renders
  const value = useMemo(() => ({ user, userRole, loading }), [user, userRole, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};

export const useAuth = () => useContext(AuthContext);