import { Route, Routes } from "react-router";
//import "./App.css";
import EventsPage from "./pages/EventsPage";

import { BrowserRouter as Router } from "react-router-dom";
import EventDetailsPage from "./pages/EventDetailsPage";

function App ()
{
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
