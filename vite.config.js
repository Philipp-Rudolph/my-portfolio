import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vitePluginWebP from './vite-plugin-webp.js'

export default defineConfig({
  plugins: [vue(), vitePluginWebP()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})