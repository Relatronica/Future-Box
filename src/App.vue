<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen">
    <div class="min-h-screen bg-gradient-to-br from-future-light to-future-light-blue dark:from-future-dark dark:to-future-dark-blue grid-bg transition-colors duration-300">
      <div class="container mx-auto px-4 py-8">
        <header class="mb-8 relative">
          <!-- Dark mode toggle -->
          <div class="absolute top-0 right-0">
            <button 
              @click="toggleDarkMode" 
              class="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <span v-if="isDarkMode" class="material-icons text-yellow-300">light_mode</span>
              <span v-else class="material-icons text-future-dark">dark_mode</span>
            </button>
          </div>
          
          <!-- Logo and title -->
          <div class="text-center py-6">
            <h1 class="text-5xl md:text-6xl font-bold tracking-tight mb-2">
              <span class="gradient-text">Future Scenarios</span>
            </h1>
            <p class="text-center text-lg text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto text-pretty">
              Explore the possibilities of tomorrow at the intersection of technology, society, and time
            </p>
          </div>
        </header>
        
        <main>
          <HomePage />
        </main>
        
        <footer class="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-800">
          <div class="max-w-4xl mx-auto">
            <p class="mb-2">© {{ new Date().getFullYear() }} Future Scenarios Explorer</p>
            <p class="text-xs">
              Exploring potential futures through the lens of emerging technologies and societal change.
            </p>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import HomePage from './views/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage
  },
  setup() {
    const isDarkMode = ref(false)
    
    // Check for system preference or saved preference on mount
    onMounted(() => {
      // Check if user has a saved preference
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        isDarkMode.value = savedTheme === 'dark'
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        isDarkMode.value = prefersDark
      }
      
      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
          isDarkMode.value = e.matches
        }
      })
    })
    
    // Toggle dark mode
    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    }
    
    // Watch for changes to update meta theme color
    watch(isDarkMode, (newValue) => {
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', newValue ? '#111827' : '#F8FAFC')
      } else {
        const meta = document.createElement('meta')
        meta.name = 'theme-color'
        meta.content = newValue ? '#111827' : '#F8FAFC'
        document.head.appendChild(meta)
      }
    })
    
    return {
      isDarkMode,
      toggleDarkMode
    }
  }
}
</script>

<style>
/* Import Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Import Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Import JetBrains Mono for code/tech elements */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

/* Global styles */
body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Add smooth scrolling to the whole page */
html {
  scroll-behavior: smooth;
}

/* Ensure transitions are smooth */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Disable transitions on page load */
.preload * {
  transition: none !important;
}
</style>