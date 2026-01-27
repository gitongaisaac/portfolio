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
    allowedHosts: ['223bce6a5462.ngrok-free.app'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})
