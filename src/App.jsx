import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import AdminLogin from "./pages/AdminLogin.jsx"; // Import AdminLogin page

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/admin-login" element={<AdminLogin />} /> {/* Add route for AdminLogin */}
      </Routes>
    </Router>
  );
}

export default App;
