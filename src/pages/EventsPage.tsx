// src/pages/EventsPage.tsx
import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { fetchUserSpecificEvents } from "../services/api";
import { Event } from "../types/Event";
const EventsPage: React.FC = () =>
{
  const [ events, setEvents ] = useState<Event[]>( [] );
  const [ loading, setLoading ] = useState( true );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const itemsPerPage = 10;  // Number of events per page

  useEffect( () =>
  {
    const getEvents = async () =>
    {
      try
      {
        const data = await fetchUserSpecificEvents();
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
  const totalPages = Math.ceil( events.length / itemsPerPage );
  const currentEvents = events.slice(
    ( currentPage - 1 ) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () =>
  {
    setCurrentPage( ( prev ) => Math.max( prev - 1, 1 ) );
  };

  const handleNextPage = () =>
  {
    setCurrentPage( ( prev ) => Math.min( prev + 1, totalPages ) );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto p-12">
        {currentEvents.map( ( event ) => (
          <EventCard key={event.route_url} event={event} />
        ) )}
      </div>
      <div className="flex justify-center items-center space-x-4 bg-gray-100 py-4 border-t border-gray-300 fixed bottom-0 w-full left-0">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${ currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${ currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventsPage;
