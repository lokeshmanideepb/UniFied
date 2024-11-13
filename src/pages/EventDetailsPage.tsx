// src/pages/EventsPage.tsx
import React from "react";
import { useLocation } from 'react-router-dom';

type EventDetailsPageProps = {
  // Define any additional props if needed
};
const EventDetailsPage: React.FC<EventDetailsPageProps> = () =>
{
  const location = useLocation();
  const event = location.state?.event;

  if ( !event )
  {
    return <p>Event not found or data missing.</p>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      {/* Display additional event details as needed */}
    </div>
  );
};
export default EventDetailsPage;
