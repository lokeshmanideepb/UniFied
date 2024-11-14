// src/services/calendarService.ts
import msalInstance from "./msalInstance";
import { Client } from "@microsoft/microsoft-graph-client";
import { Event } from "../types/Event";
import { DateTimeUtils } from "../utils/DateTimeUtils";
// Initialize Microsoft Graph client
function getGraphClient(token: string) {
  return Client.init({
    authProvider: (done: any) => {
      done(null, token);
    },
  });
}

// Function to add event to Outlook calendar
export async function addEventToCalendar(eventDetails: Event, account: any) {
  let eventDate = eventDetails.event_date.split("T")[0];
  let eventStartTime =
    eventDetails.from_time == "All Day"
      ? "08:00"
      : DateTimeUtils.convertTo24HourFormat(eventDetails.from_time);

  let eventEndTime =
    eventDetails.from_time == "All Day"
      ? "17:00"
      : eventDetails.to_time == null
      ? DateTimeUtils.addOneHour(eventDetails.from_time)
      : DateTimeUtils.convertTo24HourFormat(eventDetails.to_time);
  console.log(eventDate, eventStartTime, eventEndTime);
  const event = {
    subject: eventDetails.title,
    body: {
      contentType: "HTML",
      content: eventDetails.description,
    },
    start: {
      dateTime: `${eventDate}T${eventStartTime}:00`,
      timeZone: "Central Standard Time",
    },
    end: {
      dateTime: `${eventDate}T${eventEndTime}:00`,
      timeZone: "Central Standard Time",
    },
    location: {
      displayName: eventDetails.location == null ? null : eventDetails.location,
    },
  };
  try {
    if (!account) throw new Error("No authenticated account found");

    // Acquire token for Microsoft Graph API
    const tokenResponse = await msalInstance.acquireTokenSilent({
      account,
      scopes: ["Calendars.ReadWrite"],
    });
    const token = tokenResponse.accessToken;
    // Microsoft Graph client instance
    const graphClient = getGraphClient(token);
    // Define event details

    // Add event to the user's calendar
    await graphClient.api("/me/events").post(event);
    alert("Event added to your Outlook calendar!");
  } catch (error) {
    {
      try {
        let tokenResponse = await msalInstance.acquireTokenPopup({
          scopes: ["Calendars.ReadWrite"],
        });
        let token = tokenResponse.accessToken;

        // Re-attempt adding the event to the calendar with the new token
        const graphClient = getGraphClient(token);
        await graphClient.api("/me/events").post(event);
      } catch (popupError) {
        console.error(
          "Error adding event to calendar after popup:",
          popupError
        );
        alert("Failed to add event to calendar. Please try again.");
      }
    }
  }
}
