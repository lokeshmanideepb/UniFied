export interface ChatResponse {
  query: string;
  result: string;
}

export interface Event {
  title: string;
  date: string;
  time: string;
  venue: string;
  url: string;
}

/** Full chatbot response */
export interface ChatReturn {
  blurb: string;
  events: Event[];
}
