import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { AuthProvider, useAuth } from "./pages/auth/Authcontext";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/nav/Nav";
import Home from "./pages/home/Home";
import { LoginForm } from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Admin from "./pages/admin/Admin";
import Customer from "./pages/dashboard/Customer";
import RetailerDash from "./pages/dashboard/RetailerDash";
import DeliveryDash from "./pages/dashboard/DeliveryDash";
import FarmerDash from "./pages/dashboard/FarmerDash";
import NotFound from "./pages/NotFound";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/marketplace/ProductDetail";
import { Toaster } from "react-hot-toast";
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

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavPaths = ["/login", "/signup", "/404"];
  const shouldShowNav = !hideNavPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNav && <Nav />}
      {children}
    </>
  );
};

// Add PropTypes validation for the Layout component
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a valid React node and is required
};

const App = () => (
  <AuthProvider>
    <Toaster  position="bottom-right" reverseOrder={false} />
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productpage" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User", "Shopkeeper", "Deliveryman", "Farmer"]}>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["Admin"]}><Admin /></ProtectedRoute>} />
          <Route path="/customerdash" element={<ProtectedRoute allowedRoles={["User"]}><Customer /></ProtectedRoute>} />
          <Route path="/retailer" element={<ProtectedRoute allowedRoles={["Shopkeeper"]}><RetailerDash /></ProtectedRoute>} />
          <Route path="/deliverydash" element={<ProtectedRoute allowedRoles={["Deliveryman"]}><DeliveryDash /></ProtectedRoute>} />
          <Route path="/farmerdash" element={<ProtectedRoute allowedRoles={["Farmer"]}><FarmerDash /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute allowedRoles={["User"]}><Cart/> </ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  </AuthProvider>
);

export default App;