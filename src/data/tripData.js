// CLASS 26 REVIEW: Separate information (data) from presentation (components).
// The app reads these objects and arrays; nothing is editable yet.
// Class 27: students will add useState so users can select destinations/days.
// Class 29: the same type of data can become the initial state for useReducer.

export const trip = {
  title: 'My dream escape',
  destination: 'Lisbon, Portugal',
  dateLabel: 'June 12–15, 2027',
  travelers: 2,
  description: 'Colorful streets, scenic viewpoints, and one unforgettable weekend.',
};

export const destinations = [
  {
    id: 'lisbon',
    city: 'Lisbon',
    country: 'Portugal',
    emoji: '🚋',
    theme: 'sunset',
    description: 'Tram rides, tiled streets, and ocean breezes.',
    days: 4,
    budget: '$$',
  },
  {
    id: 'kyoto',
    city: 'Kyoto',
    country: 'Japan',
    emoji: '🌸',
    theme: 'blossom',
    description: 'Peaceful gardens, temples, and tea houses.',
    days: 5,
    budget: '$$$',
  },
  {
    id: 'reykjavik',
    city: 'Reykjavík',
    country: 'Iceland',
    emoji: '🏔️',
    theme: 'glacier',
    description: 'Waterfalls, hot springs, and dramatic landscapes.',
    days: 3,
    budget: '$$$',
  },
];

export const itinerary = [
  {
    id: 'day-1',
    label: 'Day 1',
    date: 'Sat, Jun 12',
    heading: 'Explore the old town',
    activities: [
      { id: 'a1', time: '9:00 AM', emoji: '🥐', title: 'Breakfast at a café', detail: 'Start with coffee and a pastry.' },
      { id: 'a2', time: '11:00 AM', emoji: '🚋', title: 'Ride Tram 28', detail: 'See the winding streets of Alfama.' },
      { id: 'a3', time: '4:00 PM', emoji: '📸', title: 'Sunset viewpoint', detail: 'Bring a camera for the city skyline.' },
    ],
  },
  {
    id: 'day-2',
    label: 'Day 2',
    date: 'Sun, Jun 13',
    heading: 'Culture, art & food',
    activities: [
      { id: 'b1', time: '10:00 AM', emoji: '🏛️', title: 'Visit a museum', detail: 'Discover local history and design.' },
      { id: 'b2', time: '1:00 PM', emoji: '🍽️', title: 'Try a local lunch', detail: 'Find a neighborhood restaurant.' },
    ],
  },
  {
    id: 'day-3',
    label: 'Day 3',
    date: 'Mon, Jun 14',
    heading: 'A day along the water',
    activities: [
      { id: 'c1', time: '10:30 AM', emoji: '🌊', title: 'Walk by the river', detail: 'Slow down and enjoy the scenery.' },
      { id: 'c2', time: '3:00 PM', emoji: '🍦', title: 'Afternoon treat', detail: 'Relax before the final day.' },
    ],
  },
];

export const checklist = [
  { id: 'passport', label: 'Check passport', done: true },
  { id: 'lodging', label: 'Research a place to stay', done: true },
  { id: 'bag', label: 'Pack a carry-on bag', done: false },
  { id: 'tickets', label: 'Download travel tickets', done: false },
];
