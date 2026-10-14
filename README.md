# Balcony Journal — pure frontend demo

This package is the REDcowork-compatible version of Balcony Journal. It has no
API routes, database, authentication, server secrets, server actions or remote
AI calls.

## Demo behavior

- Uploaded photos are read locally with `FileReader` and never leave the browser.
- Plant identification is a deterministic local simulation.
- Illustration choices use the bundled Japanese botanical artwork in `public/plants`.
- Plants, journal entries and household edits are stored in `localStorage`.
- The production build is a static export in `out/` containing HTML, CSS,
  JavaScript, fonts and images only.

## Run locally

```bash
npm install
npm run dev
```

## Build the static site

```bash
npm run build
```

Upload the generated `out/` directory to a static host, or upload this source
package to a frontend-only code importer. No environment variables are needed.
