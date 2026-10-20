import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * trailingSlash 'always' + build.format 'directory' erzeugt
 * /leistungen/index.html – Apache liefert das unter /leistungen/ aus.
 *
 * Bei einer WordPress-Ablösung ist das der entscheidende Punkt: alle
 * bestehenden URLs bleiben unveraendert, es sind KEINE Redirects noetig
 * und keine Rankings gehen verloren.
 */
export default defineConfig({
  site: 'https://pauldienste.de',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  compressHTML: true,
});
