import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/auth/Authcontext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, userRole, loading, roleLoading } = useAuth();

  // Show loading indicator if either authentication or role is still loading
  if (loading || roleLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to 404 if user role is not allowed
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  // Render the children if user is authenticated and role is allowed
  return children;
};

// Prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;