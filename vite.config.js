import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from 'path'
import { fileURLToPath } from 'url'

// Create __dirname manually (because ES modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '#components': path.resolve(__dirname, 'src/components'),
      '#constants': path.resolve(__dirname, 'src/constants'),
      '#store': path.resolve(__dirname, 'src/store'),
      '#hoc': path.resolve(__dirname, 'src/hoc'),
      '#windows': path.resolve(__dirname, 'src/windows'),
    },
  },
})
