// src/types/Event.ts
export interface Event {
  title: string;
  route_url: string; // Unique identifier for the event, e.g., 'event-123'
  description: string; // If you plan to handle HTML content, it should be a string
  event_date: string; // ISO string format, you could convert it to a Date object if needed
  till_date: string;
  from_time: string; // "All Day" or any specific time string
  to_time: string | null; // "All Day" or any specific time string, or null if not available
  location: string;
  tags: string[]; // Array of tags
}

export function createEvent(title: string, event_date: string, location: string): Event {
  return {
    title,
    route_url: "",
    description: "",
    event_date,
    till_date: "",
    from_time: "",
    to_time: "",
    location,
    tags: ""
  }
}
