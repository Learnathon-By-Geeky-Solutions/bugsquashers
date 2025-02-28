import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/auth/AuthContext"; // Adjust the path
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import { LoginForm } from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import CustomerDashboard from "./pages/dashboard/Customer";
import FarmerDashboard from "./pages/dashboard/FarmerDash";
import Marketplace from "./pages/marketplace/Marketplace";
import RetailerDash from "./pages/dashboard/RetailerDash";
import Addresspage from "./pages/addresspage/Addresspage";
import DeliveryDash from "./pages/dashboard/DeliveryDash";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/customerdash"
            element={
              <ProtectedRoute requiredRole="User">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmerdash"
            element={
              <ProtectedRoute requiredRole="Farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route
            path="/retailer"
            element={
              <ProtectedRoute requiredRole="Shopkeeper">
                <RetailerDash />
              </ProtectedRoute>
            }
          />
          <Route path="/addresspage" element={<Addresspage />} />
          <Route
            path="/deliverydash"
            element={
              <ProtectedRoute requiredRole="Deliveryman">
                <DeliveryDash />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="Admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;