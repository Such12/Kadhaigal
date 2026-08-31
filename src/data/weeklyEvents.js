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
    id: "mon-1",
    day: "Monday",
    title: "Silent Reading Hour",
    time: "6:00 – 8:00 PM",
    tagline: "Bring a book, or borrow one. No talking, just turning pages.",
    accent: "navy",
  },
  {
    id: "mon-2",
    day: "Monday",
    title: "Evening Writers' Drop-in",
    time: "8:15 – 9:30 PM",
    tagline: "Drop by to workshop a paragraph or an opening line.",
    accent: "sage",
  },
  {
    id: "tue-1",
    day: "Tuesday",
    title: "Crochet & Chai",
    time: "5:00 – 7:00 PM",
    tagline: "Yarn provided for beginners. Gossip provided for everyone.",
    accent: "brick",
  },
  {
    id: "tue-2",
    day: "Tuesday",
    title: "Poem Exchange",
    time: "7:30 – 8:30 PM",
    tagline: "Bring an original or a favorite poem to swap.",
    accent: "navy",
  },
  {
    id: "wed-1",
    day: "Wednesday",
    title: "Book Trivia Night",
    time: "7:00 – 9:00 PM",
    tagline: "Teams of four. Winners get a shelf-pick of their choice, free.",
    accent: "sage",
  },
  {
    id: "wed-2",
    day: "Wednesday",
    title: "Kids' Illustration Workshop",
    time: "4:00 – 5:30 PM",
    tagline: "A short session for curious hands and sticky fingers.",
    accent: "brick",
  },
  {
    id: "thu-1",
    day: "Thursday",
    title: "Poetry Open Mic",
    time: "7:30 PM onward",
    tagline: "Five minutes, one mic, zero judgment. Sign-ups from 7 PM.",
    accent: "navy",
  },
  {
    id: "thu-2",
    day: "Thursday",
    title: "Local Author Spotlight",
    time: "6:00 – 7:15 PM",
    tagline: "Interview and reading with a local novelist.",
    accent: "sage",
  },
  {
    id: "fri-1",
    day: "Friday",
    title: "Board Game Night",
    time: "6:00 – 10:00 PM",
    tagline: "Catan, Codenames, and one very competitive Scrabble board.",
    accent: "brick",
  },
  {
    id: "fri-2",
    day: "Friday",
    title: "Open Mic: Storytelling",
    time: "8:30 – 10:00 PM",
    tagline: "True stories only — ten-minute limit per storyteller.",
    accent: "navy",
  },
  {
    id: "sat-1",
    day: "Saturday",
    title: "Kids' Story Hour",
    time: "11:00 AM – 12:00 PM",
    tagline: "Read-alouds and a craft table. Parents get a free coffee.",
    accent: "sage",
  },
  {
    id: "sat-2",
    day: "Saturday",
    title: "Indie Zine Swap",
    time: "2:00 – 4:00 PM",
    tagline: "Swap zines, prints, and small-press treasures.",
    accent: "brick",
  },
  {
    id: "sun-1",
    day: "Sunday",
    title: "Sketch & Sip",
    time: "4:00 – 6:00 PM",
    tagline: "Bring any medium. We bring the good playlist.",
    accent: "navy",
  },
  {
    id: "sun-2",
    day: "Sunday",
    title: "Folk Guitar Circle",
    time: "7:00 – 9:00 PM",
    tagline: "Bring an instrument or just clap along.",
    accent: "sage",
  },
  // Past event (should be filtered out by the noticeboard)
  {
    id: "past-1",
    day: "Wednesday",
    title: "Past: Special Reading",
    time: "1:00 – 2:00 PM",
    tagline: "This event has an endDate in the past and should disappear.",
    accent: "navy",
    endDate: "2000-01-01T15:00:00Z",
  },
  // Extra future-dated event to exceed 12 and test slicing
  {
    id: "extra-1",
    day: "Monday",
    title: "Late Night Book Swap",
    time: "10:00 PM – Midnight",
    tagline: "A quiet swap table at closing — bring a light.",
    accent: "brick",
    endDate: "2099-12-31T23:59:59Z",
  },
];

export async function fetchWeeklyEvents() {
  // Simulated network delay — replace with a real fetch() when ready.
  await new Promise((resolve) => setTimeout(resolve, 500));
  return weeklyEvents;
}