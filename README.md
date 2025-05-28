# Why the App is More Than a CRUD App

### Website Link : [link](https://events-01v.pages.dev/)

## 1. **Add to Calendar Feature with Microsoft Integration**

The app allows users to add events directly to their **Microsoft Calendar** without needing to view or manage their calendar in the app. With secure OAuth integration, users can:

- **Quickly add interesting events** to their Microsoft Calendar with a single click.
- Receive reminders and updates about these events through their calendar.

---

## 2. **Scraper Schedulers**

The app doesn’t rely on outdated, manually entered event data. Instead:

- Automated **scrapers** fetch the latest events from multiple sources like university event websites.
- These scrapers run on a **daily schedule** to keep the app's event list updated in real-time.

This feature ensures the app is always fresh with new, relevant events—no stale or irrelevant information.

---

## 3. **Event Image Extraction Using Unsplash API**

Events are more engaging when they’re visually appealing. The app uses:

- **Unsplash API** to fetch high-quality images for events.
- By analyzing the event title using **natural language processing (NLP)**, the app identifies key terms to search for the most relevant image.

For example, an event titled “AI and Robotics” would automatically get a dynamic image of robots or futuristic tech, making it look professional and engaging.

This adds an extra layer of polish and appeal to the event listings.

---

## 4. **Personalized Event Recommendations Using NLP**

Everyone has different interests, and the app makes it easy for users to find what matters most to them. Here’s how it works:

- Users set preferences, like topics or themes they’re interested in (e.g., "Workshops," "Sports").
- The app uses **natural language processing (NLP)** to analyze event descriptions and tags.
- Events with matching keywords and a **relevance score above 30** are highlighted as recommendations.

Sample event with keyword and relevance

```json
{
  "nlp_tags": [
    {
      "label": "Undergraduate",
      "score": 97.8
    },
    {
      "label": "Civil Engineering",
      "score": 38.77
    },
    {
      "label": "Engineering",
      "score": 37.8
    },
    {
      "label": "Literature",
      "score": 37.75
    },
    {
      "label": "Technology",
      "score": 37.59
    },
    {
      "label": "Graduate",
      "score": 36.98
    },
    ----
    {
      "label": "Career Fairs",
      "score": 2.36
    },
    {
      "label": "Clubs",
      "score": 1.54
    },
    {
      "label": "Workshops",
      "score": 1.16
    },
    {
      "label": "Cultural Events",
      "score": 0.85
    }
  ]
}
```
