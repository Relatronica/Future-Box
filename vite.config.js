import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Generate sourcemaps for better debugging
    sourcemap: true,
    
    // Optimize output for production
    minify: 'terser',
    
    // Configure Terser options
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue'],
          'vue-router': ['vue-router'],
          'motion': ['@vueuse/motion']
        }
      }
    },
    
    // Optimize CSS
    cssCodeSplit: true,
    
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000
  },
  
  // Configure server options
  server: {
    port: 5173,
    strictPort: false,
    open: true
  },
  
  // Configure preview server (for testing production builds locally)
  preview: {
    port: 4173,
    open: true
  }
})