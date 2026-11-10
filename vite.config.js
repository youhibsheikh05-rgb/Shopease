import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Yeh line add karo

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Yeh add karo
  ],
})