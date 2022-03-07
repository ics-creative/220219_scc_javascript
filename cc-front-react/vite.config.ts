import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/read': 'http://localhost:8080',
      '/add': 'http://localhost:8080',
      '/remove': 'http://localhost:8080',
      '/update': 'http://localhost:8080',
    }
  }
})
