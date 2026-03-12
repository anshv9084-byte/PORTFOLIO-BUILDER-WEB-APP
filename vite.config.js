import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Vite configuration
  base: './',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        landing: resolve(__dirname, 'landing.html'),
        login: resolve(__dirname, 'login.html'),
        signup: resolve(__dirname, 'signup.html'),
      },
    },
  }
})
