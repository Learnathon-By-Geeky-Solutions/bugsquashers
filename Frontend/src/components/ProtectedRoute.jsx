import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/auth/Authcontext"; // Adjust the path
import PropTypes from "prop-types"; // Import PropTypes

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or skeleton
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />; // Redirect to home if role doesn't match
  }

  return children;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
  requiredRole: PropTypes.string, // Validate requiredRole prop
};

export default ProtectedRoute;