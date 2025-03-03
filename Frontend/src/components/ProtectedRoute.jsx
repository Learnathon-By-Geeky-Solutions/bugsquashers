import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/auth/Authcontext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />; // Redirect if role is unauthorized
  }

  return children;
};

// Prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
