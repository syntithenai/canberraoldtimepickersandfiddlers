import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      // generates 'manifest.webmanifest' file on build
      manifest: {
        // caches the assets/icons mentioned (assets/* includes all the assets present in your src/ directory) 
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "assets/*", "public/*"],
        name: 'Canberra Old Time Pickers And Fiddlers',
        short_name: 'Old Time Tunes',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/canberraoldtimepickersandfiddlers/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/canberraoldtimepickersandfiddlers/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
          ,
          {
            src: '/canberraoldtimepickersandfiddlers/icon-144.png',
            sizes: '144x144',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // defining cached files formats
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,abc}"],
      }
    })
  ],
  root: './',
  build: {
    outDir: './docs',
    emptyOutDir: true, // also necessary
  }
})
