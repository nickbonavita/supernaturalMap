# Supernatural Map

An interactive map inspired by the TV show Supernatural, with episode cases and hunt locations.

## Features

- Interactive map with custom markers
- Search by name, location, or notes
- Filters for creature type, season, and threat level
- Episode list with season/episode tags and case notes
- Responsive layout for desktop and mobile
- Full-series coverage: all 327 episodes across Seasons 1-15

The map includes all 327 episodes spanning all 15 seasons, and you can isolate any season with the Season filter.

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
- `episodes.json` - full episode dataset used by the app
- `.github/workflows/deploy-pages.yml` - GitHub Pages deployment pipeline