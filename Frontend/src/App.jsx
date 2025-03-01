import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth, AuthProvider } from "./pages/auth/Authcontext"; // Ensure this provides userRole
import Nav from "./components/nav/Nav";
import DeliveryDash from "./pages/dashboard/DeliveryDash";
import Admin from "./pages/admin/Admin";
import Customer from "./pages/dashboard/Customer";
import RetailerDash from "./pages/dashboard/RetailerDash";
import FarmerDash from "./pages/dashboard/FarmerDash";
import { LoginForm } from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Show loading indicator

  if (!user) return <Navigate to="/login" replace />; // Redirect if not logged in

  if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />; // Redirect if unauthorized

  return children;
};

// Add prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const MainLayout = () => {
  const location = useLocation();
  
  // List of routes where Nav should be hidden
  const hideNavRoutes = ["/login", "/signup","/404"];

  return (
    <>
      {/* Conditionally render Nav */}
      {!hideNavRoutes.includes(location.pathname) && <Nav />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin", "User", "Shopkeeper", "Deliveryman", "Farmer"]}>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<Admin />} />
        <Route path="/customerdash" element={<Customer />} />
        <Route path="/retailer" element={<RetailerDash />} />
        <Route path="/deliverydash" element={<DeliveryDash />} />
        <Route path="/farmerdash" element={<FarmerDash />} />
        <Route path="/404" element={<NotFound/>}/>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

// Redirects users based on their role
const DashboardRedirect = () => {
  const { userRole } = useAuth();

  switch (userRole) {
    case "Admin":
      return <Navigate to="/admin" replace />;
    case "User":
      return <Navigate to="/customerdash" replace />;
    case "Shopkeeper":
      return <Navigate to="/retailer" replace />;
    case "Deliveryman":
      return <Navigate to="/deliverydash" replace />;
    case "Farmer":
      return <Navigate to="/farmerdash" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default App;