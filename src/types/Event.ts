// src/types/Event.ts
export interface Event {
  title: string;
  route_url: string;
  description: string;
  event_date: string;
  till_date: string;
  from_time: string;
  to_time: string | null;
  location: string;
  tags: string[]; // Array of tags
  image_url: string | null;
  nlp_tags: string[];
}
