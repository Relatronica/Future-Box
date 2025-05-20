<template>
  <div class="max-w-4xl mx-auto">
    <!-- Hero Section -->
    <section class="text-center mb-12">
      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-r from-future-primary/10 to-future-accent/10 rounded-2xl transform -rotate-1"></div>
        <div class="relative bg-white/80 dark:bg-future-dark-blue/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 dark:border-gray-800/50">
          <h2 class="text-4xl md:text-5xl font-bold text-future-primary dark:text-future-primary-light mb-6 tracking-tight">
            Explore Tomorrow's Possibilities
          </h2>
          <p class="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-pretty">
            Generate unique scenarios at the intersection of emerging technology, societal consequences, and future timelines
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <button 
              @click="showScenarioForm = true" 
              class="btn btn-primary btn-lg flex items-center gap-2"
              v-if="!showScenarioForm && !currentScenario"
            >
              <span class="material-icons">explore</span>
              Create Your Scenario
            </button>
            <button 
              @click="resetScenario" 
              class="btn btn-dark btn-lg flex items-center gap-2"
              v-else
            >
              <span class="material-icons">refresh</span>
              Create New Scenario
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction Section -->
    <section 
      class="card card-glass mb-12 transform transition-all duration-500 hover:shadow-lg"
      v-if="!showScenarioForm && !currentScenario"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
    >
      <h2 class="text-2xl font-bold text-future-dark dark:text-future-light mb-4 flex items-center">
        <span class="material-icons mr-2 text-future-primary">lightbulb</span>
        What Are Future Scenarios?
      </h2>
      <p class="mb-4 text-gray-700 dark:text-gray-300">
        Future scenarios are narrative explorations of potential futures based on current trends, 
        emerging technologies, and societal developments. They help us understand possible outcomes 
        and prepare for different futures.
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        This tool allows you to generate custom scenarios by selecting a technology, 
        a potential consequence, and a timeframe. You can also choose the narrative tone 
        to explore optimistic, pessimistic, or balanced perspectives.
      </p>
    </section>

    <!-- Scenario Form Section (conditionally shown) -->
    <section 
      v-if="showScenarioForm" 
      class="mb-12"
      v-motion
      :initial="{ opacity: 0, scale: 0.95 }"
      :enter="{ opacity: 1, scale: 1 }"
    >
      <ScenarioForm @scenario-generated="handleScenarioGenerated" />
    </section>

    <!-- Scenario Display Section (conditionally shown) -->
    <section 
      v-if="currentScenario" 
      class="mb-12"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
    >
      <ScenarioDisplay :scenario="currentScenario" />
      <div class="mt-6">
        <ExportOptions :scenario="currentScenario" />
      </div>
    </section>

    <!-- How It Works Section -->
    <section 
      class="card card-glass mb-12"
      v-if="!showScenarioForm && !currentScenario"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
    >
      <h2 class="text-2xl font-bold text-future-dark dark:text-future-light mb-6 flex items-center">
        <span class="material-icons mr-2 text-future-secondary">settings</span>
        How It Works
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="text-center p-4 rounded-lg bg-white/50 dark:bg-future-dark/50 hover:shadow-md transition-shadow duration-300">
          <div class="bg-future-primary/10 dark:bg-future-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 glow">
            <span class="material-icons text-future-primary text-2xl">tune</span>
          </div>
          <h3 class="font-bold mb-2 text-future-dark dark:text-future-light">Select Parameters</h3>
          <p class="text-gray-700 dark:text-gray-300">Choose a technology, consequence, timeframe, and narrative tone</p>
        </div>
        <div class="text-center p-4 rounded-lg bg-white/50 dark:bg-future-dark/50 hover:shadow-md transition-shadow duration-300">
          <div class="bg-future-secondary/10 dark:bg-future-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 glow-green">
            <span class="material-icons text-future-secondary text-2xl">auto_awesome</span>
          </div>
          <h3 class="font-bold mb-2 text-future-dark dark:text-future-light">Generate Scenario</h3>
          <p class="text-gray-700 dark:text-gray-300">Our system creates a unique narrative based on your selections</p>
        </div>
        <div class="text-center p-4 rounded-lg bg-white/50 dark:bg-future-dark/50 hover:shadow-md transition-shadow duration-300">
          <div class="bg-future-accent/10 dark:bg-future-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 glow-purple">
            <span class="material-icons text-future-accent text-2xl">share</span>
          </div>
          <h3 class="font-bold mb-2 text-future-dark dark:text-future-light">Share or Save</h3>
          <p class="text-gray-700 dark:text-gray-300">Download your scenario or copy it to share with others</p>
        </div>
      </div>
    </section>

    <!-- Featured Scenarios (only shown on homepage) -->
    <section 
      class="mb-12"
      v-if="!showScenarioForm && !currentScenario"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-future-dark dark:text-future-light flex items-center">
          <span class="material-icons mr-2 text-future-accent">star</span>
          Explore Example Scenarios
        </h2>
        <button 
          @click="showScenarioForm = true"
          class="btn btn-outline btn-sm flex items-center gap-1"
        >
          <span class="material-icons text-sm">add</span>
          Create Your Own
        </button>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div 
          v-for="(example, index) in exampleScenarios" 
          :key="index"
          class="card card-hover p-5 cursor-pointer"
          @click="loadExampleScenario(example)"
        >
          <div class="flex items-start justify-between mb-3">
            <h3 class="font-bold text-lg text-future-dark dark:text-future-light">{{ example.title }}</h3>
            <span class="badge" :class="getBadgeClass(example.tone)">{{ example.tone }}</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-3">
            <span class="badge badge-primary">{{ example.technology.name }}</span>
            <span class="badge badge-secondary">{{ example.timeframe.name }}</span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {{ example.description }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import ScenarioForm from '../components/ScenarioForm.vue'
import ScenarioDisplay from '../components/ScenarioDisplay.vue'
import ExportOptions from '../components/ExportOptions.vue'
import technologies from '../assets/data/technologies.json'
import consequences from '../assets/data/consequences.json'
import timeframes from '../assets/data/timeframes.json'
import { generateScenario } from '../utils/scenarioGenerator'

export default {
  name: 'HomePage',
  components: {
    ScenarioForm,
    ScenarioDisplay,
    ExportOptions
  },
  setup() {
    // State variables
    const showScenarioForm = ref(false)
    const currentScenario = ref(null)
    
    // Example scenarios for the homepage
    const exampleScenarios = [
      {
        title: "AI Revolution in Healthcare",
        description: "Explore how artificial intelligence will transform medical diagnosis and treatment in the near future.",
        technology: technologies.find(t => t.id === 'ai'),
        consequence: consequences.find(c => c.id === 'healthcare'),
        timeframe: timeframes.find(t => t.id === 'near'),
        tone: "utopian"
      },
      {
        title: "The Dark Side of Brain Interfaces",
        description: "A cautionary look at how brain-computer interfaces might affect privacy and security by 2040.",
        technology: technologies.find(t => t.id === 'bci'),
        consequence: consequences.find(c => c.id === 'privacy'),
        timeframe: timeframes.find(t => t.id === 'mid'),
        tone: "dystopian"
      },
      {
        title: "Space Technology and Global Governance",
        description: "A balanced perspective on how space commercialization will influence international relations and governance.",
        technology: technologies.find(t => t.id === 'space'),
        consequence: consequences.find(c => c.id === 'governance'),
        timeframe: timeframes.find(t => t.id === 'far'),
        tone: "ambiguous"
      },
      {
        title: "Quantum Computing's Impact on Inequality",
        description: "How might quantum computing affect technological inequality in the distant future?",
        technology: technologies.find(t => t.id === 'quantum'),
        consequence: consequences.find(c => c.id === 'inequality'),
        timeframe: timeframes.find(t => t.id === 'distant'),
        tone: "ambiguous"
      }
    ]
    
    // Handle scenario generation
    const handleScenarioGenerated = (scenario) => {
      currentScenario.value = scenario
      showScenarioForm.value = false
      
      // Scroll to the scenario display
      setTimeout(() => {
        const scenarioDisplayElement = document.querySelector('.max-w-4xl > section:has(div.card)')
        if (scenarioDisplayElement) {
          scenarioDisplayElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
    
    // Reset the scenario state to create a new one
    const resetScenario = () => {
      currentScenario.value = null
      showScenarioForm.value = true
      
      // Scroll to the form
      setTimeout(() => {
        const formElement = document.querySelector('.max-w-4xl > section:has(form)')
        if (formElement) {
          formElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
    
    // Load an example scenario
    const loadExampleScenario = (example) => {
      const scenario = generateScenario(
        example.technology,
        example.consequence,
        example.timeframe,
        example.tone
      )
      currentScenario.value = scenario
      showScenarioForm.value = false
      
      // Scroll to the scenario display
      setTimeout(() => {
        const scenarioDisplayElement = document.querySelector('.max-w-4xl > section:has(div.card)')
        if (scenarioDisplayElement) {
          scenarioDisplayElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
    
    // Get badge class based on tone
    const getBadgeClass = (tone) => {
      const classes = {
        utopian: 'bg-future-secondary/10 text-future-secondary',
        dystopian: 'bg-future-error/10 text-future-error',
        ambiguous: 'bg-future-accent/10 text-future-accent'
      }
      return classes[tone] || classes.ambiguous
    }
    
    return {
      showScenarioForm,
      currentScenario,
      exampleScenarios,
      handleScenarioGenerated,
      resetScenario,
      loadExampleScenario,
      getBadgeClass
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>