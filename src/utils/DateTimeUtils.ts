// utils/DateTimeUtils.ts
import { parse } from "date-fns";

export class DateTimeUtils {
  // Converts a Date object to a string in 'YYYY-MM-DD' format
  static toDateString(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  // Converts a Date object to a string in 'YYYY-MM-DD HH:mm' format
  static toDateTimeString(date: Date): string {
    const datePart = date.toISOString().split("T")[0];
    const timePart = date.toTimeString().split(" ")[0].slice(0, 5); // Extracts 'HH:mm'
    return `${datePart} ${timePart}`;
  }

  // Converts a Date object to a string in 'MMM DD, YYYY' format (e.g., Nov 11, 2024)
  static toShortDateString(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  static toLongDateString(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  // Converts a Date object to a string in 'MMM DD, YYYY HH:mm AM/PM' format
  static toShortDateTimeString(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }

  // Parses a date string (e.g., '2024-11-09') into a Date object
  static parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }

  // Parses a date and time string (e.g., '2024-11-09 14:30') into a Date object
  static parseDateTime(dateTimeStr: string): Date {
    return new Date(dateTimeStr.replace(" ", "T"));
  }

  static parseWithFormat(dateStr: string, format: string): Date | null {
    try {
      const parsedDate = parse(dateStr, format, new Date());
      return isNaN(parsedDate.getTime()) ? null : parsedDate;
    } catch (error) {
      console.error("Failed to parse date:", error);
      return null;
    }
  }

  static convertTo24HourFormat(time: string): string {
    // Split time into parts
    const [timePart, modifier] = time.split(" ");

    // Split the timePart (e.g., "10:00") into hours and minutes
    let [hours, minutes] = timePart.split(":").map(Number);

    // Convert based on "am" or "pm"
    if (modifier.toLowerCase() === "pm" && hours !== 12) {
      hours += 12;
    } else if (modifier.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    // Format to "hh:mm" with leading zero for hours if needed
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }

  static addOneHour(time: string): string {
    // Split time into parts
    const [timePart, modifier] = time.split(" ");

    // Split the timePart (e.g., "10:00") into hours and minutes
    let [hours, minutes] = timePart.split(":").map(Number);

    // Convert hours to 24-hour format based on am/pm
    if (modifier.toLowerCase() === "pm" && hours !== 12) {
      hours += 12;
    } else if (modifier.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    // Add one hour
    hours = (hours + 1) % 24; // Use modulus to wrap around after 23

    // Format hours and minutes with leading zeros
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }
}
