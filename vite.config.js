import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  root: '.',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        landing: resolve('landing.html'),
      },
    },
  }
})
