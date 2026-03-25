import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom') || id.includes('react-router-dom') || (id.includes('/react/') && !id.includes('react-dom'))) {
            return 'react-vendor'
          }
          if (id.includes('gsap')) {
            return 'gsap-vendor'
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
  },
})
