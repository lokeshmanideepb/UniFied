// categoriesConfig.ts
export const categoriesConfig = {
  "Event Type": [
    "Academic Seminars",
    "Sports",
    "Cultural Events",
    "Workshops",
    "Social Gatherings",
    "Career Fairs",
    "Conferences",
    "Competitions",
    "Networking",
    "Skill-Building",
    "Clubs",
    "Student Government",
  ],
  "Interests and Hobbies": [
    "Art",
    "Music",
    "Technology",
    "Literature",
    "Gaming",
    "Fitness",
  ],
  "Student Categories": [
    "International Students",
    "Undergraduate",
    "Graduate",
    "PhD",
  ],
  "Academic Field": [
    "Engineering",
    "Health Sciences",
    "Business Administration",
    "Psychology",
    "Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Biological Sciences",
    "Architecture",
  ],
};

export const labels = [
  ...categoriesConfig["Event Type"],
  ...categoriesConfig["Interests and Hobbies"],
  ...categoriesConfig["Student Categories"],
  ...categoriesConfig["Academic Field"],
];
