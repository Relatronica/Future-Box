<template>
  <div class="card card-glass relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute -top-10 -right-10 w-40 h-40 bg-future-primary/10 dark:bg-future-primary/20 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-future-accent/10 dark:bg-future-accent/20 rounded-full blur-3xl"></div>
    
    <div class="relative">
      <h2 class="text-2xl font-bold text-future-dark dark:text-future-light mb-6 flex items-center">
        <span class="material-icons mr-2 text-future-primary">rocket_launch</span>
        Create Your Future Scenario
      </h2>
      
      <form @submit.prevent="generateScenario" class="space-y-6">
        <!-- Technology Selection -->
        <div class="form-group">
          <label for="technology" class="form-label flex items-center">
            <span class="material-icons text-sm mr-1 text-future-primary">memory</span>
            Technology
          </label>
          <select 
            id="technology" 
            v-model="selectedTechnology" 
            class="form-select"
            required
          >
            <option value="" disabled>Select a technology</option>
            <option 
              v-for="tech in technologies" 
              :key="tech.id" 
              :value="tech"
            >
              {{ tech.name }}
            </option>
          </select>
          <transition name="fade">
            <p v-if="selectedTechnology" class="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
              {{ selectedTechnology.description }}
            </p>
          </transition>
        </div>
        
        <!-- Consequence Selection -->
        <div class="form-group">
          <label for="consequence" class="form-label flex items-center">
            <span class="material-icons text-sm mr-1 text-future-secondary">insights</span>
            Consequence
          </label>
          <select 
            id="consequence" 
            v-model="selectedConsequence" 
            class="form-select"
            required
          >
            <option value="" disabled>Select a consequence</option>
            <option 
              v-for="consequence in consequences" 
              :key="consequence.id" 
              :value="consequence"
            >
              {{ consequence.name }}
            </option>
          </select>
          <transition name="fade">
            <p v-if="selectedConsequence" class="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
              {{ selectedConsequence.description }}
            </p>
          </transition>
        </div>
        
        <!-- Timeframe Selection -->
        <div class="form-group">
          <label for="timeframe" class="form-label flex items-center">
            <span class="material-icons text-sm mr-1 text-future-accent">schedule</span>
            Time Frame
          </label>
          <select 
            id="timeframe" 
            v-model="selectedTimeframe" 
            class="form-select"
            required
          >
            <option value="" disabled>Select a time frame</option>
            <option 
              v-for="timeframe in timeframes" 
              :key="timeframe.id" 
              :value="timeframe"
            >
              {{ timeframe.name }}
            </option>
          </select>
          <transition name="fade">
            <p v-if="selectedTimeframe" class="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
              {{ selectedTimeframe.description }}
            </p>
          </transition>
        </div>
        
        <!-- Narrative Tone Selection -->
        <div class="form-group">
          <label class="form-label flex items-center mb-3">
            <span class="material-icons text-sm mr-1 text-future-primary">mood</span>
            Narrative Tone
          </label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label class="relative cursor-pointer">
              <input 
                type="radio" 
                name="tone" 
                value="utopian" 
                v-model="selectedTone"
                class="sr-only"
              >
              <div class="p-4 rounded-lg border-2 transition-all duration-200"
                :class="selectedTone === 'utopian' ? 
                  'border-future-secondary bg-future-secondary/10 dark:bg-future-secondary/20' : 
                  'border-gray-200 dark:border-gray-700 hover:border-future-secondary/50'"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-future-dark dark:text-future-light">Utopian</span>
                  <span class="material-icons text-future-secondary">sentiment_very_satisfied</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Optimistic view of technology's positive impact</p>
              </div>
            </label>
            
            <label class="relative cursor-pointer">
              <input 
                type="radio" 
                name="tone" 
                value="dystopian" 
                v-model="selectedTone"
                class="sr-only"
              >
              <div class="p-4 rounded-lg border-2 transition-all duration-200"
                :class="selectedTone === 'dystopian' ? 
                  'border-future-error bg-future-error/10 dark:bg-future-error/20' : 
                  'border-gray-200 dark:border-gray-700 hover:border-future-error/50'"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-future-dark dark:text-future-light">Dystopian</span>
                  <span class="material-icons text-future-error">sentiment_very_dissatisfied</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Pessimistic view highlighting potential risks</p>
              </div>
            </label>
            
            <label class="relative cursor-pointer">
              <input 
                type="radio" 
                name="tone" 
                value="ambiguous" 
                v-model="selectedTone"
                class="sr-only"
              >
              <div class="p-4 rounded-lg border-2 transition-all duration-200"
                :class="selectedTone === 'ambiguous' ? 
                  'border-future-accent bg-future-accent/10 dark:bg-future-accent/20' : 
                  'border-gray-200 dark:border-gray-700 hover:border-future-accent/50'"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-future-dark dark:text-future-light">Ambiguous</span>
                  <span class="material-icons text-future-accent">sentiment_neutral</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Balanced perspective considering multiple outcomes</p>
              </div>
            </label>
          </div>
        </div>
        
        <!-- Validation Error Message -->
        <div v-if="validationError" class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span class="material-icons text-red-500">error_outline</span>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700 dark:text-red-400">{{ validationError }}</p>
            </div>
          </div>
        </div>
        
        <!-- Submit Button -->
        <div class="flex justify-center pt-4">
          <button 
            type="submit" 
            class="btn btn-primary btn-lg flex items-center gap-2"
            :disabled="!formIsValid || isGenerating"
            :class="{'opacity-70 cursor-not-allowed': !formIsValid || isGenerating}"
          >
            <template v-if="isGenerating">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="loading-dots">Generating</span>
            </template>
            <template v-else>
              <span class="material-icons">auto_awesome</span>
              Generate Scenario
            </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { generateScenario } from '../utils/scenarioGenerator'
import technologies from '../assets/data/technologies.json'
import consequences from '../assets/data/consequences.json'
import timeframes from '../assets/data/timeframes.json'

export default {
  name: 'ScenarioForm',
  emits: ['scenario-generated'],
  setup(props, { emit }) {
    // Form data
    const selectedTechnology = ref('')
    const selectedConsequence = ref('')
    const selectedTimeframe = ref('')
    const selectedTone = ref('ambiguous')
    const isGenerating = ref(false)
    const validationError = ref('')
    
    // Computed property to check if form is valid
    const formIsValid = computed(() => {
      return selectedTechnology.value && 
             selectedConsequence.value && 
             selectedTimeframe.value && 
             selectedTone.value
    })
    
    // Method to generate scenario
    const generateScenarioHandler = async () => {
      // Clear any previous validation errors
      validationError.value = ''
      
      // Validate form
      if (!selectedTechnology.value) {
        validationError.value = 'Please select a technology'
        return
      }
      
      if (!selectedConsequence.value) {
        validationError.value = 'Please select a consequence'
        return
      }
      
      if (!selectedTimeframe.value) {
        validationError.value = 'Please select a timeframe'
        return
      }
      
      if (!selectedTone.value) {
        validationError.value = 'Please select a narrative tone'
        return
      }
      
      isGenerating.value = true
      
      try {
        // Add a slight delay to show the loading state (for better UX)
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Generate the scenario using the utility function
        const scenario = generateScenario(
          selectedTechnology.value,
          selectedConsequence.value,
          selectedTimeframe.value,
          selectedTone.value
        )
        
        // Emit the generated scenario to parent component
        emit('scenario-generated', scenario)
      } catch (error) {
        console.error('Error generating scenario:', error)
        validationError.value = 'An error occurred while generating the scenario. Please try again.'
      } finally {
        isGenerating.value = false
      }
    }
    
    return {
      // Data
      technologies,
      consequences,
      timeframes,
      selectedTechnology,
      selectedConsequence,
      selectedTimeframe,
      selectedTone,
      isGenerating,
      validationError,
      
      // Computed
      formIsValid,
      
      // Methods
      generateScenario: generateScenarioHandler
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>