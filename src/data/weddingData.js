// TODO: Replace all placeholder values below with your real wedding details.

export const couple = {
  partner1: 'Jordan Jackson',
  partner2: 'Sophie Mayo',
}

// ISO date string used for the countdown and display. Include the time of the ceremony.
export const weddingDateISO = '2026-10-10T16:00:00'

// TODO: Replace photo and text with your real story + a favorite photo of the two of you.
export const story = {
  photo: '/images/hero.jpg',
  heading: 'Our Story',
  text: "We can't wait to share this day with the people who mean the most to us. Scroll down to see how it all came together, where we're celebrating, and how to find us on the day.",
}

// TODO: Replace with real photos of you two. Add/remove entries as needed.
export const gallery = [
  { src: '/images/gallery-1.jpg', caption: 'Add a photo' },
  { src: '/images/gallery-2.jpg', caption: 'Add a photo' },
  { src: '/images/gallery-3.jpg', caption: 'Add a photo' },
  { src: '/images/gallery-4.jpg', caption: 'Add a photo' },
]

export const venue = {
  name: 'The Grand Garden Venue',
  address: '123 Celebration Way, Springfield, ST 12345',
  mapUrl: 'https://maps.google.com/?q=123+Celebration+Way+Springfield',
}

export const schedule = [
  { time: '3:30 PM', title: 'Guest Arrival', description: 'Please arrive at least 30 minutes early to find parking and be seated.' },
  { time: '4:00 PM', title: 'Ceremony', description: 'The ceremony will take place in the garden pavilion.' },
  { time: '5:00 PM', title: 'Cocktail Hour', description: 'Drinks and appetizers on the terrace.' },
  { time: '6:00 PM', title: 'Reception & Dinner', description: 'Dinner, toasts, and dancing in the main hall.' },
  { time: '11:00 PM', title: 'Send-Off', description: 'Thank you for celebrating with us!' },
]

export const travel = {
  intro: 'A few options for getting to and from the venue, and places to stay nearby.',
  accommodations: [
    {
      name: 'Springfield Grand Hotel',
      description: 'Block of rooms reserved under "Smith Wedding" - mention the code when booking.',
      link: 'https://example.com/springfield-grand-hotel',
      photo: '/images/hotel-1.jpg',
    },
    {
      name: 'Cozy Inn & Suites',
      description: 'Budget-friendly option about 10 minutes from the venue.',
      link: 'https://example.com/cozy-inn-suites',
      photo: '/images/hotel-2.jpg',
    },
  ],
  gettingThere: [
    'The nearest airport is Springfield Regional (SGF), about 25 minutes from the venue.',
    'Limited on-site parking is available; carpooling is encouraged.',
    'A shuttle will run between the Springfield Grand Hotel and the venue starting at 3:00 PM.',
  ],
}

// TODO: Replace with your real Formspree (or other) form endpoint, e.g. https://formspree.io/f/your-form-id
export const rsvpFormAction = 'https://formspree.io/f/YOUR_FORM_ID'
