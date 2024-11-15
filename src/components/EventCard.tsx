// src/components/EventCard.tsx
import React from "react";
import { Event } from "../types/Event";
import { Link } from "react-router-dom";
import { DateTimeUtils } from "../utils/DateTimeUtils";
import { useNavigate } from "react-router-dom";
import { RoomOutlined } from "@mui/icons-material";
import parse from "html-react-parser";
import { addEventToCalendar } from "../services/calendarService";
import { useAuth } from "../pages/AuthContext";
interface EventCardProps
{
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ( { event } ) =>
{
  const history = useNavigate();
  const { account } = useAuth();
  const truncatedContent = ( html: string, maxWords: number ) =>
  {
    // Use a regular expression to limit the HTML content to a certain number of words
    const words = html.split( " " );
    return words.length > maxWords
      ? words.slice( 0, maxWords ).join( " " ) + "..."
      : html;
  };

  const handleShowMore = () =>
  {
    history( `/event/${ event.route_url }` );
  };
  const handleAddToCalendar = () =>
  {
    addEventToCalendar( event, account );
  };

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
  const text = truncatedContent( event.description, 50 );

  return (
    <div className="max-w-4xl mx-auto m-4 p-4 shadow-lg border rounded-lg bg-white flex">
      <div className="mt-4 flex-shrink-0 w-1/3 relative">
        <img
          className="w-full h-40 object-cover rounded-lg"
          src="https://via.placeholder.com/150"
          alt="Event Image"
        />
        <p className="mt-8 text-gray-700 items-center">
          {event.location ? (
            <>
              <RoomOutlined /> {event.location}
            </>
          ) : (
            ""
          )}
        </p>
        <p className=" text-gray-700">
          {dateString}
          {tillDateString ? `- ${ tillDateString }` : ""}
        </p>
        <strong>
          {event.from_time} {event.to_time ? ` - ${ event.to_time }` : ""}
        </strong>
      </div>
      <div className="ml-4 flex-grow">
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          {event.title}
        </h2>
        <div className="mt-4 p-4 items-center text-left">
          <span>
            {parse( text )}
            <span
              className="text-blue-500 cursor-pointer"
              style={{ whiteSpace: "nowrap" }}
              onClick={handleShowMore}
            >
              Show more
            </span>
          </span>
        </div>
        <div className="mt-4 items-center space-x-2">
          <button className="border border-blue-500 text-blue-500 rounded-lg px-4 py-2" onClick={handleShowMore}>
            View Details
          </button>
          <button
            className="bg-green-500 text-white rounded-lg px-4 py-2"
            onClick={handleAddToCalendar}
          >
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
