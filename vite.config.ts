import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/portfolio-full-stack/' : '/',
  build: {
    outDir: 'docs'
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: { host: true, port: 3000 },
})
