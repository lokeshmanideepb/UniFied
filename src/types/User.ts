export interface OnboardingResponses {
  eventTypes: string[]; // Whether the user wants event notifications
  eventCategories: string[]; // A list of preferred event types (e.g., seminars, workshops)
  departmentAssociation: string; // Whether the user wants to receive newsletters
  internationalStudent: string;
  academicLevel: string;
  major: string; // The user's major (if applicable)
  hobbies: string[];
}

// Main user model with all the required fields
export interface User {
  username: string; // User's username
  email: string; // User's email address
  fullName?: string; // Optional full name of the user
  preferences?: OnboardingResponses | null; // User's preferences (nested object)
}
