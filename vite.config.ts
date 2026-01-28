import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import {resolve} from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        project: resolve(__dirname, 'project.html'),
      }
    },
  },
  plugins: [
    tailwindcss(),
  ],
  server: {
    allowedHosts: ['9f0cf1c5858a.ngrok-free.app'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})
