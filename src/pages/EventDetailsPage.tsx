// src/pages/EventsPage.tsx
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import { fetchEvent } from "../services/api";
import { addEventToCalendar } from "../services/calendarService";
import { Event } from "../types/Event";
import { DateTimeUtils } from "../utils/DateTimeUtils";
const EventDetailsPage: React.FC = () =>
{
  const navigate = useNavigate();
  const { account } = useAuth();
  const { eventId } = useParams<{ eventId: string }>();
  const [ event, setEvent ] = useState<Event | null>( null );
  useEffect( () =>
  {
    const getEvent = async () =>
    {
      if ( !event && eventId )
      {
        const data = await fetchEvent( eventId );
        if ( data ) setEvent( data );
        else navigate( "/events" );
      }
    };
    getEvent();
  }, [ event, eventId, navigate ] );

  const handleAddToCalendar = () =>
  {
    if ( event ) addEventToCalendar( event, account );
  };
  if ( !event )
  {
    return <div>Loading...</div>;
  }
  let eventDate = DateTimeUtils.parseDate( event.event_date );
  if ( !eventDate )
  {
    eventDate = new Date();
  }
  const dateString = DateTimeUtils.toLongDateString( eventDate );
  let tillDateString: string | null = null;
  if ( event.till_date )
  {
    const tillDate = DateTimeUtils.parseDate( event.till_date );
    if ( tillDate )
    {
      tillDateString = DateTimeUtils.toLongDateString( tillDate );
    }
  }
  return (
    <div className="max-w-4xl p-6 bg-white text-left">
      <img
        className="w-full h-80 object-cover rounded-lg mt-12"
        src={event.image_url ? event.image_url : "https://placehold.co/400"}
        alt="Event Image"
      />
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-800 mt-12">{event.title}</h1>

      {/* Date / Time */}
      <div className="text-lg text-gray-700 mt-6">
        <p>
          <strong>Date / Time</strong>
        </p>
        <p>
          {dateString}
          {tillDateString ? `- ${ tillDateString }` : ""}
        </p>
        <p>
          {event.from_time} {event.to_time ? ` - ${ event.to_time }` : ""}
        </p>
      </div>
      <button
        className="bg-green-500 text-white rounded-lg px-4 py-2 mt-6"
        onClick={handleAddToCalendar}
      >
        Add to Calendar
      </button>
      {/* Location */}
      {event.location ? (
        <div className="text-lg text-gray-700 mt-6">
          <p>
            <strong>Location</strong>
          </p>
          <p>
            <a href="#" className="text-blue-600 underline">
              {event.location}
            </a>
          </p>
        </div>
      ) : (
        ""
      )}

      {/* Categories */}
      <div className="text-lg text-gray-700 mt-6">
        <p>
          <strong>Categories</strong>
        </p>
        <div className="flex space-x-2">
          {event.tags.map( ( tag ) => (
            <span className=" text-blue-600">{tag}</span>
          ) )}
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-800 mt-6 ">
        <div className="prose prose-lg prose-p:m-0 max-w-none">
          {parse( event.description )}
        </div>
      </div>
    </div>
  );
};
export default EventDetailsPage;
