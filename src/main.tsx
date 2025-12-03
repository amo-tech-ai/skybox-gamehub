import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { inject } from '@vercel/analytics';
// Vidstack CSS imports (must be before app)
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import App from "./App.tsx";
import "./index.css";

// Initialize Vercel Web Analytics
inject();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
