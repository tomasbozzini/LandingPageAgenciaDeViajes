import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Landing de una sola pagina: SSG puro, sin adaptador ni backend.
export default defineConfig({
  site: 'https://meridianosur.com.ar',
  // Puerto fijo y estricto: si está ocupado, falla en vez de saltar a otro
  // en silencio (que fue justo lo que confundió al abrir el proyecto equivocado).
  server: { port: 4330, strictPort: true },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
