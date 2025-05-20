<template>
  <div class="flex flex-wrap gap-4 justify-center">
    <button 
      @click="saveAsTxt" 
      class="btn btn-dark flex items-center gap-2 transition-all duration-300 hover:scale-105"
      :disabled="isExporting"
    >
      <span class="material-icons">download</span>
      Save as .txt
    </button>
    
    <button 
      @click="copyToClipboard" 
      class="btn btn-accent flex items-center gap-2 transition-all duration-300 hover:scale-105"
      :disabled="isExporting"
    >
      <span class="material-icons">content_copy</span>
      Copy to Clipboard
    </button>
    
    <button 
      @click="shareScenario" 
      class="btn btn-primary flex items-center gap-2 transition-all duration-300 hover:scale-105"
      :disabled="isExporting || !canShare"
    >
      <span class="material-icons">share</span>
      Share
    </button>
    
    <!-- Success notification -->
    <transition name="notification">
      <div 
        v-if="notification.show" 
        class="fixed bottom-4 right-4 px-4 py-3 rounded-md shadow-lg flex items-center gap-2 z-50 max-w-xs"
        :class="notification.type === 'success' ? 'bg-future-secondary text-white' : 'bg-future-error text-white'"
      >
        <span class="material-icons">{{ notification.type === 'success' ? 'check_circle' : 'error' }}</span>
        <span>{{ notification.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { exportScenarioAsText, copyScenarioToClipboard } from '../utils/scenarioGenerator'

export default {
  name: 'ExportOptions',
  props: {
    scenario: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isExporting = ref(false)
    const notification = ref({
      show: false,
      message: '',
      type: 'success'
    })
    const canShare = ref(false)
    
    // Check if Web Share API is available
    onMounted(() => {
      canShare.value = !!navigator.share
    })
    
    // Show notification
    const showNotification = (message, type = 'success') => {
      notification.value = {
        show: true,
        message,
        type
      }
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        notification.value.show = false
      }, 3000)
    }
    
    // Function to save scenario as a text file
    const saveAsTxt = async () => {
      isExporting.value = true
      
      try {
        const content = exportScenarioAsText(props.scenario)
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        
        // Create a filename based on the scenario details
        const filename = `future-scenario-${props.scenario.technology.id}-${props.scenario.timeframe.id}.txt`
        
        // Create a temporary link element and trigger download
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        
        // Clean up
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        showNotification('Scenario saved successfully')
      } catch (error) {
        console.error('Error saving file:', error)
        showNotification('Failed to save the file. Please try again.', 'error')
      } finally {
        isExporting.value = false
      }
    }
    
    // Function to copy scenario to clipboard
    const copyToClipboard = async () => {
      isExporting.value = true
      
      try {
        const content = copyScenarioToClipboard(props.scenario)
        
        await navigator.clipboard.writeText(content)
        showNotification('Copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy text: ', err)
        
        // Fallback method for browsers that don't support clipboard API
        try {
          const textArea = document.createElement('textarea')
          textArea.value = copyScenarioToClipboard(props.scenario)
          
          // Make the textarea out of viewport
          textArea.style.position = 'fixed'
          textArea.style.left = '-999999px'
          textArea.style.top = '-999999px'
          document.body.appendChild(textArea)
          
          textArea.focus()
          textArea.select()
          
          const successful = document.execCommand('copy')
          if (successful) {
            showNotification('Copied to clipboard!')
          } else {
            showNotification('Failed to copy to clipboard. Please try again.', 'error')
          }
          
          document.body.removeChild(textArea)
        } catch (fallbackErr) {
          console.error('Fallback copy method failed:', fallbackErr)
          showNotification('Failed to copy to clipboard. Please try again.', 'error')
        }
      } finally {
        isExporting.value = false
      }
    }
    
    // Function to share scenario using Web Share API
    const shareScenario = async () => {
      if (!navigator.share) {
        showNotification('Sharing is not supported on this browser', 'error')
        return
      }
      
      isExporting.value = true
      
      try {
        const content = copyScenarioToClipboard(props.scenario)
        
        await navigator.share({
          title: props.scenario.title,
          text: content,
        })
        
        showNotification('Shared successfully')
      } catch (error) {
        console.error('Error sharing:', error)
        
        // User cancelled share operation is not an error
        if (error.name !== 'AbortError') {
          showNotification('Failed to share. Please try again.', 'error')
        }
      } finally {
        isExporting.value = false
      }
    }
    
    return {
      isExporting,
      notification,
      canShare,
      saveAsTxt,
      copyToClipboard,
      shareScenario
    }
  }
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>