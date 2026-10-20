# MediBook

A complete doctor appointment booking web app built as a static React single-page application.
Calm sage/teal + ivory design with gradient avatar artwork (no photographs), a full three-step
booking flow, and appointments that persist in the browser.

**Live:** https://medibook-muhammad-shahzaibs-projects-16858ef3.vercel.app

All doctor names, clinics, patient reviews, fees and contact details are fictional and original.

## Stack

- React 18 + Vite
- Tailwind CSS v3 (with `tailwind.config.js` + PostCSS)
- Framer Motion (animations, page transitions)
- react-router-dom v6 (`BrowserRouter`)
- Plain JSX, no TypeScript

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Routes

| Route                     | Page                                                                 |
|---------------------------|----------------------------------------------------------------------|
| `/`                       | Home — hero with search, specialities grid, featured doctors, how-it-works, testimonials, CTA |
| `/doctors`                | Doctor listing — search, speciality filter chips, sorting (rating, fee, experience) |
| `/doctors/:id`            | Doctor profile — about, education, services, next-3-days availability, patient reviews |
| `/book/:id`               | 3-step booking — pick a slot → validated patient details → review & confirm |
| `/booking-confirmed/:ref` | Confirmation page with the booking reference (e.g. `MB-XXXXXX`)      |
| `/appointments`           | My Appointments — bookings list with filters and cancel flow         |
| `/about`                  | Story, values, timeline and stats                                    |
| `/contact`                | Validated enquiry form, support info and FAQs                        |

## Features

- 8 fictional doctors across 8 specialities (Cardiology, Dermatology, Paediatrics, Orthopaedics,
  General Medicine, Dentistry, Ophthalmology, Neurology), each with ratings, patient counts,
  fees in PKR, experience and next-available times
- Elegant gradient initial-avatars instead of photos — the whole site ships with **zero image files**
- Live availability: time slots for the next 3 days, with deterministic "taken" slots and slots
  filled by your own bookings greyed out
- Booking flow with full form validation (including Pakistani mobile number format) and a
  generated booking reference
- Bookings persist to `localStorage` under `medibook-bookings`; contact enquiries under
  `medibook-enquiries`
- Cancel a booking from My Appointments (status updates in `localStorage`; the slot frees up)
- Scroll-reveal animations, animated page transitions and an animated mobile menu
- Fully responsive layout

## Deployment

`vercel.json` includes an SPA rewrite so client-side routes resolve correctly on Vercel.
