# Supernatural Map

An interactive map of folklore sightings, haunted landmarks, and anomalous zones.

## Features

- Interactive map with custom markers
- Search by name, location, or notes
- Filters for type, era, and threat level
- Detail panel with lore snippets and status tags
- Responsive layout for desktop and mobile

## Run It

No build step is required.

1. Open `index.html` directly in a browser, or
2. Run a local static server from this folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy To GitHub Pages

This repository includes a GitHub Actions workflow that deploys the static site automatically on every push to `main`.

Expected live URL for this repo:

```text
https://nickbonavita.github.io/supernaturalMap/
```

Deployment notes:

1. Push your latest changes to `main`.
2. In GitHub, go to **Settings -> Pages** and ensure the source is **GitHub Actions**.
3. Wait for the **Deploy static content to Pages** workflow to complete.

## Project Files

- `index.html` - app shell and layout
- `styles.css` - visual theme and responsive design
- `app.js` - map logic, filters, and rendering
- `.github/workflows/deploy-pages.yml` - GitHub Pages deployment pipeline