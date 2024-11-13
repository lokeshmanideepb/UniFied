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
  
}
