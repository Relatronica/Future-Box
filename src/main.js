import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import { MotionPlugin } from '@vueuse/motion'

// Create Vue app
const app = createApp(App)

// Add motion plugin for animations
app.use(MotionPlugin)

// Prevent transition flashes on page load
document.documentElement.classList.add('preload')
window.addEventListener('load', () => {
  document.documentElement.classList.remove('preload')
})

// Mount the app
app.mount('#app')