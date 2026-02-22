import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'Alchymisti Recording Helper',
        short_name: 'Alchymisti Rec',
        description: 'Helper for Alchymisti Video recording',
        theme_color: '#404040',
        background_color: '#404040',
        display: 'standalone',
      },

      workbox: {
        globPatterns: ['client/**/*.{js,css,ico,png,svg,wav,webp,woff,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        suppressWarnings: true,
        navigateFallback: '/',
        navigateFallbackAllowlist: [/^\/$/],
        type: 'module',
      },
    }),
    devtoolsJson(),
  ],
});
