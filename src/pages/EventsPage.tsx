// src/pages/EventsPage.tsx
import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import { Event } from "../types/Event";
import EventCard from "../components/EventCard";

const EventsPage: React.FC = () =>
{
  const [ events, setEvents ] = useState<Event[]>( [] );
  const [ loading, setLoading ] = useState( true );

  useEffect( () =>
  {
    const getEvents = async () =>
    {
      try
      {
        const data = await fetchEvents();
        setEvents( data );
      } catch ( error )
      {
        console.error( "Failed to fetch events:", error );
      } finally
      {
        setLoading( false );
      }
    };

    getEvents();
  }, [] );

  if ( loading ) return <p>Loading events...</p>;

  return (
    <div className="p-4">
      {events.map( ( event ) => (
        <EventCard key={event.title} event={event} />
      ) )}
    </div>
  );
};

export default EventsPage;
