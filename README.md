# Little Paws Dubai

A responsive puppy-boutique website built with React, Redux Toolkit, Express REST APIs, and MySQL. The page order, warm palette, arched puppy-card grid, responsive layout, and main interactions follow the supplied reference closely, while the project uses its own brand, writing, and Unsplash-hosted imagery rather than reproducing another business's identity or proprietary assets.

## Project structure

- `index.html` — Vite's root HTML entry point; it mounts the React app from `src/main.jsx`
- `src/App.jsx` — route configuration and app-wide effects
- `src/pages/HomePage.jsx` — homepage composition and puppy data loading
- `src/pages/home/` — focused homepage sections and image configuration
- `src/pages/HowItWorksPage.jsx` — how-it-works page
- `src/components/layout/` — shared site header and footer
- `src/components/puppies/PuppyCards.jsx` — reusable puppy cards for the homepage
- `src/Puppies.jsx` — searchable puppy catalogue, photo-gallery profiles, and enquiry forms
- `src/store.js` — Redux Toolkit async state for catalogue and enquiries
- `src/styles/` — application styles, separated into the shared site stylesheet and page-specific styles
- `src/styles/site.css` — shared theme, layout, catalogue, and puppy profile styles
- `src/styles/pages/home.css` — homepage-specific styles
- `server/index.js` — Express REST endpoints and request validation
- `server/db.js` — MySQL data access, with seed-data demo mode for local setup
- `server/schema.sql` — MySQL database, tables, and starter puppy records

## Run locally

1. Install Node.js 20+ and MySQL 8+.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set your MySQL connection values.
4. Run `server/schema.sql` in MySQL if you want to use the database mode.
5. Run `npm run dev`, then open `http://localhost:5173`.

If `DB_HOST`, `DB_USER`, or `DB_NAME` is missing, the API serves the bundled demo catalogue so the frontend can run without a local database. Enquiries in demo mode are accepted in memory; configure MySQL for durable inquiry storage.

## REST API

- `GET /api/health` — API and database/demo-mode health
- `GET /api/puppies?breed=&gender=&location=&search=` — puppy catalogue and filters
- `GET /api/puppies?origin=&collection=&status=` — URL-addressable location, collection, and rehomed filters
- `GET /api/puppies/:slug` — puppy detail
- `POST /api/inquiries` — validates and saves an enquiry (name and phone required; email and area optional)

The Shih Tzu boy profile is available at `/puppies/shitzu-male`; its enquiry section is directly addressable at `/puppies/shitzu-male#enquire-shitzu-male`. Profile photos, gallery controls, care details, and the enquiry form are served from the same API-backed puppy record. MySQL inquiry storage includes optional `email` and `area` columns; apply the current `server/schema.sql` when creating the database.

## Build and checks

- `npm run build` — production frontend build
- `npm test` — API test suite
- `npm start` — production API process (serve the built Vite `dist/` folder through a static host or reverse proxy)

For deployment, host the built frontend and Node API, configure `VITE_API_URL` at build time if they use different origins, provide MySQL credentials as environment variables, and set `CLIENT_ORIGIN` to the frontend origin. Configure the static host to fall back to `index.html` for SPA routes.

## Assignment recording notes

The original assignment prompt asked for a complete responsive clone of `https://puppy.instabizweb.com/` using React.js, Redux, Node.js, MySQL, Express, and REST APIs, plus deployment, a GitHub repository, and a Loom walkthrough. Implementation prompt used here: “Build a responsive puppy-boutique website inspired by the supplied reference. Use React and Redux Toolkit for the frontend, and Node.js, Express REST APIs, and MySQL for the backend. Include a home page, puppy catalogue with filters, puppy detail pages, enquiry form, journey/how-it-works content, and responsive styling. Keep the implementation original: do not copy the reference brand, text, or photos. Make it runnable locally, document setup, and validate the production build and API.”

The puppy catalogue has URL-backed origin, collection, breed, and gender chips; puppy cards open data-backed profiles; the gone-home cards lead to a separate archive route. Page arrival, card entrance, image hover, filter-chip, and custom paw cursor/trail animations are implemented in `src/styles/site.css` and `src/App.jsx`. The cursor illustration is original (`public/paw-cursor.svg`) and is disabled on coarse pointers/reduced-motion environments.

No hosting, GitHub, or Loom credentials were available in this workspace, so those external deliverables still need to be completed by the assignment owner.
