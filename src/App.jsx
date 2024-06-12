import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx"; // Import AdminDashboard page

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add route for AdminDashboard */}
      </Routes>
    </Router>
  );
}

export default App;
