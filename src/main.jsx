import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// global.css must load before App so component styles can override it
import './styles/global.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Production pages are pre-rendered at build time (scripts/prerender.mjs),
// so hydrate the existing HTML; in dev the root is empty, so render fresh.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app)
} else {
  ReactDOM.createRoot(container).render(app)
}
