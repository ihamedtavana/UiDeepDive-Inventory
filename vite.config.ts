import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    watch: { ignored: ['**/artifacts/**', '**/node-compile-cache/**'] },
  },
  preview: {
    host: 'localhost',
    port: 4173,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
  },
})
