/* ChatWidget.tsx  – polished version with avatars, typing indicator,
   compact event-card rail, error styling, and small a11y tweaks. */

import { useEffect, useRef, useState } from "react";
import { getChatResponse } from "../services/chatService";
import type { ChatReturn, Event } from "../types/ChatResponse";

/* ---------- message variants ---------- */
type UserMsg = { kind: "user"; text: string; t: number };
type BotMsg = { kind: "bot"; blurb: string; events: Event[]; t: number };
type ErrMsg = { kind: "error"; text: string; t: number };
type Msg = UserMsg | BotMsg | ErrMsg;

/* ---------- tiny helpers ---------- */
const now = () => Date.now();

export default function ChatWidget ()
{
    const [ open, setOpen ] = useState( false );
    const [ input, setInput ] = useState( "" );
    const [ msgs, setMsgs ] = useState<Msg[]>( [] );
    const [ isLoading, setLoad ] = useState( false );
    const boxRef = useRef<HTMLDivElement>( null );
    const WELCOME: BotMsg = {
        kind: "bot",
        blurb:
            "👋 Welcome to UIC Events! Ask me about any upcoming event—date, topic, or location—and I’ll find it for you.",
        events: [],
        t: Date.now(),
    };
    const hasWelcomed = useRef( false );
    useEffect( () =>
    {
        if ( open && !hasWelcomed.current )
        {
            setMsgs( ( m ) => [ ...m, WELCOME ] );
            hasWelcomed.current = true;
        }
    }, [ open ] );
    /* keep scroll at bottom */
    useEffect( () =>
    {
        boxRef.current?.scrollTo( { top: boxRef.current.scrollHeight } );
    }, [ msgs, isLoading ] );

    /* fetch answer */
    async function send ()
    {
        if ( !input.trim() ) return;

        const question = input.trim();
        setMsgs( ( m ) => [ ...m, { kind: "user", text: question, t: now() } ] );
        setInput( "" );
        setLoad( true );

        try
        {
            const res: ChatReturn = await getChatResponse( question );
            setMsgs( ( m ) => [
                ...m,
                { kind: "bot", blurb: res.blurb, events: res.events, t: now() },
            ] );
        } catch ( e )
        {
            console.error( e );
            setMsgs( ( m ) => [
                ...m,
                { kind: "error", text: "Sorry, I couldn’t fetch events. Try again.", t: now() },
            ] );
        } finally
        {
            setLoad( false );
        }
    }

    /* bubble builders */
    const UserBubble = ( { text }: { text: string } ) => (
        <div className="flex justify-end">
            <div className="flex flex-row-reverse items-end gap-1">
                <p
                    className="max-w-[70%] rounded-lg bg-sky-600 text-white px-3 py-2 shadow"
                    title={new Date().toLocaleTimeString()}
                >
                    {text}
                </p>
                <span aria-hidden>🧑‍🎓</span>
            </div>
        </div>
    );

    const TypingBubble = () => (
        <div className="flex items-center gap-1">
            <span aria-hidden>🤖</span>
            <div className="rounded-lg bg-gray-200 px-3 py-2">
                <span className="inline-block animate-bounce">• • •</span>
            </div>
        </div>
    );

    const ErrorBubble = ( { text }: { text: string } ) => (
        <div className="flex items-start">
            <span aria-hidden>⚠️</span>
            <p
                className="max-w-[80%] rounded-lg bg-red-50 text-red-700 border border-red-300 px-3 py-2 shadow"
                title={new Date().toLocaleTimeString()}
            >
                {text}
            </p>
        </div>
    );

    const BotBubble = ( { blurb, events }: { blurb: string; events: Event[] } ) => (
        <div className="flex flex-col items-start space-y-2">
            <div className="flex items-start gap-1">
                <span aria-hidden>🤖</span>
                <p
                    className="max-w-[90%] rounded-lg bg-gray-200 text-gray-900 px-3 py-2 shadow"
                    title={new Date().toLocaleTimeString()}
                >
                    {blurb}
                </p>
            </div>
            {/* vertical list of event cards */}
            {events.length > 0 && (
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                    {events.map( ( ev, i ) => (
                        <a
                            key={i}
                            href={ev.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                        >
                            <p className="font-medium text-sky-700 line-clamp-2">{ev.title}</p>
                            <p className="text-xs text-gray-600">
                                {ev.date} • {ev.time}
                            </p>
                            <p className="text-xs text-gray-500">{ev.venue}</p>
                        </a>
                    ) )}
                </div>
            )}

            {/* optional CTA */}
            {/* <a
                href="/events"
                className="text-xs text-sky-600 hover:underline ml-7"
                target="_blank"
                rel="noreferrer"
            >
                View all events →
            </a> */}
        </div>
    );

    /* ----------------------------- render -------------------------- */
    return (
        <>
            {/* floating toggle button */}
            <button
                onClick={() => setOpen( !open )}
                className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-300"
                aria-label={open ? 'Close chat' : 'Open chat'}
            >
                💬
            </button>

            {/* chat panel */}
            {open && (
                <section
                    role="dialog"
                    aria-label="Chat window"
                    className="fixed bottom-24 right-6 w-[360px] h-[550px] flex flex-col rounded-2xl bg-white shadow-xl z-50 animate-slideUp"
                >
                    {/* header bar */}
                    <header className="flex items-center justify-between px-4 py-3 border-b">
                        <h2 className="font-semibold text-lg">Hello, let’s chat!</h2>
                        <button
                            onClick={() => setOpen( false )}
                            aria-label="Close chat"
                            className="text-xl leading-none text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    </header>

                    {/* messages */}
                    <div
                        ref={boxRef}
                        role="log"
                        aria-live="polite"
                        className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-sm"
                    >
                        {msgs.map( ( m ) =>
                            m.kind === 'user' ? (
                                <UserBubble key={m.t} text={m.text} />
                            ) : m.kind === 'bot' ? (
                                <BotBubble key={m.t} blurb={m.blurb} events={m.events} />
                            ) : (
                                <ErrorBubble key={m.t} text={m.text} />
                            )
                        )}

                        {isLoading && <TypingBubble />}
                    </div>

                    {/* input row */}
                    <form
                        onSubmit={( e ) =>
                        {
                            e.preventDefault();
                            send();
                        }}
                        className="border-t flex items-center gap-2 px-3 py-2"
                    >
                        <input
                            value={input}
                            onChange={( e ) => setInput( e.target.value )}
                            className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                            placeholder="Ask me anything…"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            aria-label="Send message"
                            className="rounded-full p-2 hover:bg-sky-50 disabled:opacity-40"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-sky-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.75 21l10.5-9-10.5-9v6l-7.5 3 7.5 3v6z"
                                />
                            </svg>
                        </button>
                    </form>
                </section>
            )}
        </>
    );
}
