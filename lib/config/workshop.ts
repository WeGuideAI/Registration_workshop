// ─────────────────────────────────────────────────────────────────
// Workshop & company configuration
// Centralise all mutable copy here so no component needs editing.
// ─────────────────────────────────────────────────────────────────

export const workshopConfig = {
  name: "AI & Robotics Awareness Workshop",
  shortName: "AI & Robotics Workshop",
  company: "WeGuide",
  tagline: "AI & Robotics, Made Simple for Everyone.",
  description:
    "An easy, friendly awareness workshop explaining how Artificial Intelligence " +
    "and Robots work in everyday life. 100% beginner-friendly — no technical background needed.",
  contactEmail: "info@weguide.co.in",
  contactPhone: "+91 75939 93975",
  phoneRaw: "07593993975",
  website: "https://weguide.work",
  supportEmail: "info@weguide.co.in",
  googleReview: "5.0 ★ Google Review",
  address: {
    venue: "We Guide Office, Orchid Mall",
    line1: "2nd Floor, Orchid Mall, 966 National Highway",
    locality: "Sekharipuram, Kalpathy",
    city: "Palakkad",
    state: "Kerala",
    pincode: "678003",
    googleMapsUrl: "https://www.google.com/maps/dir//We+Guide,+2nd+Floor,+Orchid+Mall,+We+Guide,+966,+National+Highway,+Sekharipuram,+Kalpathy,+Palakkad,+Kerala+678003/@10.7881484,76.6528817,17z?entry=ttu",
    embedMapUrl: "https://maps.google.com/maps?q=10.7881484,76.6528817&hl=en&z=16&output=embed",
  },
  disclaimer:
    "Disclaimer: WeGuide reserves the right to reschedule, modify, merge, or cancel " +
    "workshop sessions or dates without prior individual notice due to operational, technical, " +
    "or administrative constraints. Participation is subject to slot availability and verification.",
} as const;

export type WorkshopConfig = typeof workshopConfig;
