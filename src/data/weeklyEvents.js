/**
 * weeklyEvents.js
 * -----------------------------------------------------------------------
 * The "admin-editable" source for the Community notice board.
 *
 * FOR THE ADMIN
 *   Update the `weeklyEvents` array below every week — that's the whole
 *   workflow for now. Each entry is one day's pinned note.
 *
 * FOR THE DEVELOPER
 *   `fetchWeeklyEvents()` simulates an async API call (500ms delay) so
 *   the section component below is already written against a real
 *   fetch/loading pattern. When a backend exists, replace the body of
 *   this function with a real request, e.g.:
 *
 *     export async function fetchWeeklyEvents() {
 *       const res = await fetch("/api/events/this-week");
 *       if (!res.ok) throw new Error("Failed to load this week's events");
 *       return res.json();
 *     }
 *
 *   As long as the resolved shape matches the objects below, nothing in
 *   EventsNoticeboard.jsx needs to change.
 * -----------------------------------------------------------------------
 */

export const weeklyEvents = [
  {
    day: "Monday",
    title: "Silent Reading Hour",
    time: "6:00 – 8:00 PM",
    tagline: "Bring a book, or borrow one. No talking, just turning pages.",
    accent: "navy",
  },
  {
    day: "Tuesday",
    title: "Crochet & Chai",
    time: "5:00 – 7:00 PM",
    tagline: "Yarn provided for beginners. Gossip provided for everyone.",
    accent: "brick",
  },
  {
    day: "Wednesday",
    title: "Book Trivia Night",
    time: "7:00 – 9:00 PM",
    tagline: "Teams of four. Winners get a shelf-pick of their choice, free.",
    accent: "sage",
  },
  {
    day: "Thursday",
    title: "Poetry Open Mic",
    time: "7:30 PM onward",
    tagline: "Five minutes, one mic, zero judgment. Sign-ups from 7 PM.",
    accent: "navy",
  },
  {
    day: "Friday",
    title: "Board Game Night",
    time: "6:00 – 10:00 PM",
    tagline: "Catan, Codenames, and one very competitive Scrabble board.",
    accent: "brick",
  },
  {
    day: "Saturday",
    title: "Kids' Story Hour",
    time: "11:00 AM – 12:00 PM",
    tagline: "Read-alouds and a craft table. Parents get a free coffee.",
    accent: "sage",
  },
  {
    day: "Sunday",
    title: "Sketch & Sip",
    time: "4:00 – 6:00 PM",
    tagline: "Bring any medium. We bring the good playlist.",
    accent: "navy",
  },
];

export async function fetchWeeklyEvents() {
  // Simulated network delay — replace with a real fetch() when ready.
  await new Promise((resolve) => setTimeout(resolve, 500));
  return weeklyEvents;
}