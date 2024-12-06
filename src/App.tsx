import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppFlowDocumentation from "./pages/AppFlowDocumentation";
import { AuthProvider } from "./pages/AuthContext";
import EventDetailsPage from "./pages/EventDetailsPage";
import EventsCalendar from "./pages/EventsCalendar";
import EventsPage from "./pages/EventsPage";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";
import OnboardingFlow from "./pages/Intro/OnboardingFlow";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";
function App ()
{
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/documentation" element={<AppFlowDocumentation />} />"
          <Route
            path="/onboarding"
            element={<PrivateRoute element={<OnboardingFlow />} />}
          />
          <Route
            path="/events"
            element={<PrivateRoute element={<EventsPage />} />}
          />
          <Route
            path="/event/:eventId"
            element={<PrivateRoute element={<EventDetailsPage />} />}
          />
          <Route
            path="/calendar"
            element={<EventsCalendar />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
