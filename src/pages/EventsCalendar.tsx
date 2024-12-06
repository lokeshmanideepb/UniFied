import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useEffect, useState } from 'react';
import { categoriesConfig } from '../config/TagsConfig';
import { fetchEvents } from "../services/api";
import { DateTimeUtils } from '../utils/DateTimeUtils';
type CalendarEvent = {
    title: string;
    start: string;
    end?: string; // Optional for single-day events
    url?: string; // Optional for linking to details
    nlp_tags?: string[]; // Optional for
    extendedProps?: {
        fromTime?: string;
        toTime?: string;
    };
};

const EventsCalendar: React.FC = () =>
{
    const [ calendarEvents, setCalendarEvents ] = useState<CalendarEvent[]>( [] );
    const [ filteredEvents, setFilteredEvents ] = useState<CalendarEvent[]>( [] );
    const [ selectedLabels, setSelectedLabels ] = useState<string[]>( [] );

    const [ loading, setLoading ] = useState( true );

    const mapEventToCalendarEvent = ( event: any ): CalendarEvent =>
    {
        try
        {
            const defaultStartTime = "00:00";
            const startDateTime = `${ event.event_date.split( "T" )[ 0 ] }T${ event.from_time && event.from_time != "All Day" ? DateTimeUtils.convertTo24HourFormat( event.from_time ) : defaultStartTime }`
            const endDateTime = `${ event.event_date.split( "T" )[ 0 ] }T${ event.to_time ? DateTimeUtils.convertTo24HourFormat( event.to_time ) : defaultStartTime }`
            return {
                title: event.title,
                start: startDateTime, // FullCalendar accepts ISO 8601 strings
                end: endDateTime, // Optional: Use the same day for single-day events
                url: `/event/${ event.route_url }`,
                nlp_tags: nlJustTags( event.nlp_tags ), // Optional: Add custom tags for filtering
                extendedProps: {
                    fromTime: event.from_time,
                    toTime: event.to_time,
                },
            };
        }
        catch ( error )
        {
            console.log( error );
        }
        return event;
    };
    const nlJustTags = ( tagObjects: { label: string; score: number }[] ): string[] =>
    {
        return tagObjects.filter( tag => tag.score > 20 ) // Filter tags with score > 20
            .map( tag => tag.label );
    }

    useEffect( () =>
    {
        // Here you can fetch events from an API or database
        // For demonstration, we're using hardcoded events
        const getEvents = async () =>
        {
            try
            {
                const data = await fetchEvents();
                setCalendarEvents( data.map( mapEventToCalendarEvent ) )
                setFilteredEvents( data.map( mapEventToCalendarEvent ) )
                console.log( calendarEvents )
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
    useEffect( () =>
    {
        if ( selectedLabels.length === 0 )
        {
            setFilteredEvents( calendarEvents );
        } else
        {
            const filtered = calendarEvents.filter( event =>
                event.nlp_tags ? event.nlp_tags.some( label => selectedLabels.includes( label ) ) : event
            );
            setFilteredEvents( filtered );
        }
    }, [ selectedLabels, calendarEvents ] );
    const handleLabelChange = ( label: string ) =>
    {
        setSelectedLabels( prev =>
            prev.includes( label ) ? prev.filter( l => l !== label ) : [ ...prev, label ]
        );
    };

    if ( loading ) return <p>Loading events...</p>;
    return (
        <div className='calendar-container flex h-screen w-screen mt-16 -ml-36'>
            <div className="w-1/5 p-4 border-r">
                {Object.entries( categoriesConfig ).map( ( [ category, labels ] ) => (
                    <div key={category} className="category-section p-4">
                        <h3 className="category-title font-bold">{category}</h3>
                        <div className="checkbox-list p-4">
                            {labels.map( ( label ) => (
                                <label key={label} className="flex items-center space-x-2">
                                    <input type="checkbox" value={label} onChange={() => handleLabelChange( label )}
                                    />
                                    <span>{label}</span>
                                </label>
                            ) )}
                        </div>
                    </div>
                ) )}
            </div>
            <div className="w-4/5 p-4">

                <FullCalendar
                    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    events={filteredEvents}
                    height="90vh" // Full height
                    headerToolbar={
                        {
                            left: 'prev,next today',
                            center: 'title',
                            end: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }
                    }
                />
            </div>
        </div>
    );
};

export default EventsCalendar;