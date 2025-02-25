import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { LoginForm } from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import CustomerDashboard from "./pages/dashboard/Customer";
import Dashboard from "./pages/dashboard/FarmerDash";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customerdash" element={<CustomerDashboard />} />
        <Route path="/farmerdash" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;