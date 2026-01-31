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
    allowedHosts: [],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})
