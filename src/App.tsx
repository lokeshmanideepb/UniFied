import { Route, Routes } from "react-router";
//import "./App.css";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import EventDetailsPage from "./pages/EventDetailsPage";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./pages/PrivateRoute";
import { AuthProvider } from "./pages/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/events"
            element={<PrivateRoute element={<EventsPage />} />}
          />
          <Route
            path="/event/:eventId"
            element={<PrivateRoute element={<EventDetailsPage />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
