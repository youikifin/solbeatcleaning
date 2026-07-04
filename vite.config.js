import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Vite only exposes VITE_* env vars to the client by default; also allow
  // NEXT_PUBLIC_* so the Vercel-configured GA measurement ID reaches the
  // browser bundle. Only ever put PUBLIC values behind these prefixes.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  server: {
    port: 5174,
  },
})
