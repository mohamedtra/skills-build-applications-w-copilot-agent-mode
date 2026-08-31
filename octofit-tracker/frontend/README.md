# OctoFit Tracker Frontend

This React app connects to the OctoFit API and renders athlete, team, activity, workout, and leaderboard data.

## Environment setup

The frontend builds API URLs from `VITE_CODESPACE_NAME` in Vite. This variable must be defined for Codespaces so the app uses the public GitHub Codespaces endpoint instead of an invalid URL.

Create a local environment file before running the app:

```bash
cp .env.local.example .env.local
```

Example `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000` instead of generating a malformed URL such as `https://undefined-8000.app.github.dev`.

## Local development

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## API URL pattern

The frontend uses:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

when the Codespace name is available.
