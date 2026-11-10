import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Landing de una sola pagina: SSG puro, sin adaptador ni backend.
export default defineConfig({
  site: 'https://www.elisamediciviajes.tur.ar',
  // Puerto fijo y estricto: si está ocupado, falla en vez de saltar a otro
  // en silencio (que fue justo lo que confundió al abrir el proyecto equivocado).
  server: { port: 4330, strictPort: true },
  // sitemap fijado en 3.7.0: desde 3.7.1 depende de sitemap@9, que pide
  // Node >= 20.19.5 (la máquina de desarrollo tiene 20.17).
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
