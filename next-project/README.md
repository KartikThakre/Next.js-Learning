# React Meetups

A learning project built with Next.js. Browse meetups, open a meetup's details,
and submit a new meetup. Meetup data is stored in MongoDB Atlas.

## Requirements

- Node.js 18.18 or newer
- npm
- A MongoDB Atlas cluster and database user

## Getting started

1. Open a terminal in the `next-project` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in this directory and add your MongoDB Atlas
   connection string:

   ```text
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/meetups?retryWrites=true&w=majority
   ```

   Replace the placeholders with your Atlas database username, password, and
   cluster host. URL-encode special characters in the username or password.
   In Atlas, add your current IP address under **Network Access**.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

Restart the development server after editing `.env.local`. That file is ignored
by Git: do not commit or share the connection string.

## Features

- View the meetup list on the home page.
- Open a meetup's details at `/<meetup-id>`.
- Add a meetup at `/new-meetup`.
- Read and write meetup records in the MongoDB `meetups` collection.
- Revalidate the home page data every second.

## Project structure

```text
components/
  layout/       Site navigation and page layout
  meetups/      Meetup list, details, and form
  ui/           Shared UI components
pages/
  api/          API routes
  [meetupId]/   Dynamic meetup details page
  new-meetup/   New meetup form page
  index.js      Meetup home page
styles/         Global styles
```

## API

`POST /api/new-meetup` accepts a JSON meetup object with `title`, `image`,
`address`, and `description` fields and inserts it into MongoDB.

## Available scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm start      # Serve the production build
```

The production build reads meetup data from MongoDB, so the Atlas connection
string must be configured and the database reachable when building.
