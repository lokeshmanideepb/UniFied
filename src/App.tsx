import { RoundaboutLeft } from "@mui/icons-material";
import "./App.css";
import EventsPage from "./pages/EventsPage";
import { Route, Routes } from "react-router";

import { BrowserRouter as Router } from "react-router-dom";
import EventDetailsPage from "./pages/EventDetailsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={EventsPage} />
          <Route path="/event/:eventId" element={<EventDetailsPage />} />"
        </Routes>
      </Router>
    </>
  );
}

export default App;
