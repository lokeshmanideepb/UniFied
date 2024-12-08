import React from 'react';

const AppFlowDocumentation: React.FC = () =>
{
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-left">
            <h1 className="text-4xl font-extrabold text-center text-indigo-600 my-16">
                Welcome to the UIC Events Web App
            </h1>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Overview</h2>
                <p className="text-lg text-gray-600">
                    The UIC Events Web App is designed to help students stay updated on the latest campus events and activities.
                    You can easily view upcoming events, get detailed information about them, and add them to your calendar.
                    Here's how to use the platform:
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">1. Login</h2>
                <p className="text-lg text-gray-600">
                    To get started, you need to log in. You can use your Microsoft account to sign in quickly and securely.
                    Once logged in, you'll have access to all the features of the platform, including event browsing and personalized content.
                </p>
                <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg mt-4">
                    <p className="font-semibold">Tip:</p>
                    <p>Logging in is the first step to fully personalize your event experience!</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">2. Onboarding Flow</h2>
                <p className="text-lg text-gray-600">
                    After logging in, you will be guided through a brief onboarding process to set up your preferences.
                    During this process, you can specify the types of events you're most interested in, helping us tailor recommendations just for you.
                </p>
                <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg mt-4">
                    <p className="font-semibold">Pro Tip:</p>
                    <p>Completing the onboarding process ensures a more personalized event experience!</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">3. Events Page</h2>
                <p className="text-lg text-gray-600">
                    Once onboarding is complete, you’ll be directed to the main Events Page. Here, you'll see a list of upcoming events that match your interests.
                    Each event card provides key details such as the event title, date, time, and a brief description. You can click on any event to see more information.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">4. Event Details Page</h2>
                <p className="text-lg text-gray-600">
                    When you click on an event from the list, you'll be taken to the Event Details Page. This page includes more detailed information about the event, such as:
                    <ul className="list-disc pl-6 mt-2 text-gray-600">
                        <li>A full description of what the event is about.</li>
                        <li>The speakers or hosts involved.</li>
                        <li>The exact time and location of the event.</li>
                    </ul>
                    Additionally, you'll find a button to add the event to your personal calendar, making it easy to keep track of.
                </p>
                <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg mt-4">
                    <p className="font-semibold">Did You Know?</p>
                    <p>You can easily add events to your calendar with just a click!</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">5. Consolidated Calendar Page</h2>
                <p className="text-lg text-gray-600">
                    The Consolidated Calendar Page gives you a complete overview of all upcoming events in a calendar format.
                    You can easily browse through the month or week to see which events are happening on specific days.
                    This page provides a holistic view of all events across campus, so you never miss out on anything!
                </p>
                <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg mt-4">
                    <p className="font-semibold">Calendar Tip:</p>
                    <p>You can click on any event in the calendar to view its full details and add it to your personal calendar.</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">6. Add to Calendar</h2>
                <p className="text-lg text-gray-600">
                    Each event page has an "Add to Calendar" button that lets you add events directly to your personal calendar (e.g., Google Calendar, Outlook).
                    Simply click the button, and the event will be saved to your calendar with all relevant details such as the time, location, and description.
                    This feature ensures that you’ll be reminded about upcoming events, helping you stay organized.
                </p>
                <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg mt-4">
                    <p className="font-semibold">Reminder:</p>
                    <p>Don't forget to add your events to your calendar for a seamless reminder experience!</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get Started</h2>
                <p className="text-lg text-gray-600">
                    We hope you enjoy using the UIC Events Web App and find it helpful in keeping track of important campus events.
                    To get started, simply log in with your Microsoft account, complete the onboarding process, and begin exploring all the amazing events happening at your university!
                </p>
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mt-4">
                    <p className="font-semibold">Let’s Go:</p>
                    <p>Start your journey today and never miss an exciting event again!</p>
                </div>
            </section>
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Repositories</h2>
                <p className="text-lg text-gray-600 mb-4">
                    Explore the codebases powering the UIC Events platform:
                </p>
                <ul className="space-y-4">
                    <li>
                        <a
                            href="https://github.com/lokeshmanideepb/UniFied"
                            className="text-blue-500 font-semibold hover:underline hover:text-blue-700"
                        >
                            UIC Events Web App
                        </a>
                        <span className="text-gray-700"> - The frontend codebase for the UIC Events Web App.</span>
                    </li>
                    <li>
                        <a
                            href="https://github.com/lokeshmanideepb/cs484-proj-backend"
                            className="text-blue-500 font-semibold hover:underline hover:text-blue-700"
                        >
                            UIC Events Backend
                        </a>
                        <span className="text-gray-700"> - The backend codebase managing APIs and data.</span>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default AppFlowDocumentation;
