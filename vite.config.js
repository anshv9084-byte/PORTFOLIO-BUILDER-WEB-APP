import { defineConfig } from 'vite'

export default defineConfig({
  // Vite configuration
  base: '/PORTFOLIO-BUILDER-WEB-APP/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
})
