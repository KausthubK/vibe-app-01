# vibe-app-01

A simple React web app where users can enter their name and see it displayed.

## Features

- Text input for entering a name
- "Go" button to submit the name
- Displays the entered name below the button

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

Build the app for deployment:

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Testing

This project includes unit tests, integration tests, and end-to-end (E2E) tests.

### First-Time Setup

Install dependencies (including test packages):

```bash
npm install
```

For unit/integration tests I would recommend installing the Vitest extension for test configuration so that you can see your tests and run them individually, debug through them, etc. For E2E tests the Playwright Test for VSCode is a good option.

For E2E tests, install Playwright browsers:

```bash
npx playwright install
```

### Running Tests

#### Unit and Integration Tests (Vitest)

**Run all tests once:**
```bash
npm test
```
Runs all unit and integration tests in `tests/unit/` and `tests/integration/`.

**Watch mode (runs on file changes):**
```bash
npm run test:watch
```
Reruns tests automatically when you change files - great for development!

**Visual test UI:**
```bash
npm run test:ui
```
Opens a browser UI where you can view and run tests interactively.

#### E2E Tests (Playwright)

**Run E2E tests:**
```bash
npm run test:e2e
```
- Automatically starts the dev server
- Runs tests in Chromium, Firefox, and WebKit
- Runs headless by default

**E2E tests with UI:**
```bash
npm run test:e2e:ui
```
Opens Playwright's UI where you can view and debug tests visually.

### Test Commands Quick Reference

| Command | What it does |
|---------|-------------|
| `npm test` | Run unit/integration tests once |
| `npm run test:watch` | Run unit/integration tests in watch mode |
| `npm run test:ui` | Open Vitest UI for unit/integration tests |
| `npm run test:e2e` | Run E2E tests (headless) |
| `npm run test:e2e:ui` | Run E2E tests with Playwright UI |

## Deployment

The `dist` folder contains the static files ready for deployment. You can deploy to:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repo and it will auto-detect Vite
- **GitHub Pages**: Upload the `dist` folder contents
- **Any static hosting service**: Upload the contents of the `dist` folder
