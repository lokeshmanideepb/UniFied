// src/pages/EventsPage.tsx
import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Event } from "../types/Event";
import EventCard from "../components/EventCard";
import { useAuth } from "./AuthContext";
import { getUserData, postUserData } from "../services/api";
import { User } from "../types/User";
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
    <div className="p-12">
      {events.map( ( event ) => (
        <EventCard key={event.route_url} event={event} />
      ) )}
    </div>
  );
};

export default EventsPage;
