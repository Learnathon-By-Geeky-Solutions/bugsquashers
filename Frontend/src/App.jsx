import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthProvider, useAuth } from "./pages/auth/Authcontext";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav/Nav";
import Home from "./pages/home/Home";
import { LoginForm } from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Admin from "./pages/admin/Admin";
import Customer from "./pages/dashboard/Customer";
import RetailerDash from "./pages/dashboard/RetailerDash";
import DeliveryDash from "./pages/dashboard/DeliveryDash";
import FarmerDash from "./pages/dashboard/FarmerDash";
import NotFound from "./components/NotFound";
import Cart from "./pages/cart/Cart";
import { ProductDetail } from "./pages/marketplace/ProductDetail";
import { Toaster } from "react-hot-toast";
import Marketplace from "./pages/marketplace/Marketplace";
import FarmerMarket from "./pages/marketplace/FarmerMarket"; // You'll need to create this component
import ForgotPassword from "./pages/auth/ForgetPassword";
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

const MarketplaceRedirect = () => {
  const { userRole } = useAuth();
  
  switch (userRole) {
    case "Farmer":
    case "Shopkeeper":
      return <Navigate to="/farmermarket" replace />;
    case "User":
    case "Deliveryman":
    default:
      return <Navigate to="/market" replace />;
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => (
  <AuthProvider>
    <Toaster position="bottom-right" reverseOrder={false} />
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/market" element={<Marketplace />} />
          <Route path="/farmermarket" element={<FarmerMarket />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User", "Shopkeeper", "Deliveryman", "Farmer"]}>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketplace"
            element={
                <MarketplaceRedirect />
            }
          />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["Admin"]}><Admin /></ProtectedRoute>} />
          <Route path="/customerdash" element={<ProtectedRoute allowedRoles={["User"]}><Customer /></ProtectedRoute>} />
          <Route path="/retailer" element={<ProtectedRoute allowedRoles={["Shopkeeper"]}><RetailerDash /></ProtectedRoute>} />
          <Route path="/deliverydash" element={<ProtectedRoute allowedRoles={["Deliveryman"]}><DeliveryDash /></ProtectedRoute>} />
          <Route path="/farmerdash" element={<ProtectedRoute allowedRoles={["Farmer"]}><FarmerDash /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute allowedRoles={["User"]}><Cart/> </ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forgetpassword" element={<ForgotPassword/>} />
          
        </Routes>
      </Layout>
    </Router>
  </AuthProvider>
);

export default App;