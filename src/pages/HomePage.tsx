import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import EventCard from "../components/EventCard";
import { createEvent, Event } from "../types/Event";
import "../styles/HomePage.css"

const HomePage: React.FC = () => {

  // const feat1:Event = createEvent("Annual Music Festival", "April 15, 2023", "Central Park, NY");

  const event1:Event = createEvent("Tech Conference 2024", "January 25, 2025", "");
  const event2:Event = createEvent("Yoga and Wellness", "February 15, 2025", "");
  const event3:Event = createEvent("Art Exhibition", "March 3, 2025", "");

  return (
    <Layout>

    <div className="home">
      {/* Header */}

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to University Events
          </h1>
          <p className="text-lg mb-8">
            Stay updated with the latest events happening on campus. From
            seminars and workshops to extracurricular activities, we have it
            all!
          </p>
          <Link
            to="/events"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-700 hover:text-white transition duration-300"
          >
            View Events
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 feature-title">Discover Events</h3>
            <p className="text-gray-600">
              Browse through a variety of events happening at your university.
              Filter by date, category, and more.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 feature-title">Save Your Favorites</h3>
            <p className="text-gray-600">
              Bookmark your favorite events and get notified when they are
              happening.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4 feature-title">Add Your Own Events</h3>
            <p className="text-gray-600">
              If you're hosting an event, you can add it to the platform for
              others to discover!
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-gray-100 py-16 events-upcoming">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Upcoming Events
          </h2>
          <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 eventcards">
            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Tech Conference 2024
              </h3>
              <p className="text-gray-600">
                Join us for an exciting tech conference featuring industry
                leaders and innovators.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Date: January 25, 2025
              </p>
            </div> */}
            <EventCard event={event1} />
            <EventCard event={event2} />
            <EventCard event={event3} />
            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Yoga and Wellness
              </h3>
              <p className="text-gray-600">
                Attend our wellness session for stress relief and mindfulness
                techniques.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Date: February 15, 2025
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Art Exhibition
              </h3>
              <p className="text-gray-600">
                Explore an art exhibition showcasing works from university
                students and local artists.
              </p>
              <p className="text-sm text-gray-500 mt-4">Date: March 3, 2025</p>
            </div>*/}
          </div> 
          <Link
            to="/events"
            className="text-blue-600 mt-8 inline-block text-lg font-semibold"
          >
            View All Events →
          </Link>
        </div>
      </section>

      {/* Footer */}
    </div>

      <div className="home">
      {/* <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto text-center">
       <h1 className="text-4xl font-bold mb-4">
         Welcome to University Events       
       </h1>
       <p className="text-lg mb-8">
         Stay updated with the latest events happening on campus. From
         seminars and workshops to extracurricular activities, we have it
         all!
       </p>
       <Link
         to="/events"
         className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-700 hover:text-white transition duration-300"
       >
        View Events
       </Link>
      </div>
      </section> */}

      {/* <section className="home-featured">
        <h2>Featured Event</h2>
        <EventCard event={feat1} />
      </section>

      <section className="home-upcoming">
        <h2>Upcoming Events</h2>
        <div className="event-list">
        </div>
      </section> */}

      <section className="home-calendar">
        {/* <CalendarView /> */}
      </section>
    </div>
    </Layout>
    
  );
};

export default HomePage;
