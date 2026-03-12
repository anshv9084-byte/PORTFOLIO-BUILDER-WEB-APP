import { defineConfig } from 'vite'

export default defineConfig({
  // Vite configuration
  base: './',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
})
