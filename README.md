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

## Deployment

The `dist` folder contains the static files ready for deployment. You can deploy to:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repo and it will auto-detect Vite
- **GitHub Pages**: Upload the `dist` folder contents
- **Any static hosting service**: Upload the contents of the `dist` folder
