import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: [
        fileURLToPath(new URL('./index.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem/foundation/color.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem/foundation/typography.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem/foundation/spacing.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem/foundation/radius.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem/foundation/shadow.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem/foundation/layout.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem/foundation/iconography.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem/components/button.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem/components/badge.html', import.meta.url)),
        fileURLToPath(new URL('./designsystem/components/tab.html', import.meta.url)),
      ],
    },
  },
  test: {
    environment: 'jsdom',
  },
})
