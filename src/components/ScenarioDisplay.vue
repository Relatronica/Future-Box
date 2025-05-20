<template>
  <div class="card card-glass relative overflow-hidden">
    <!-- Decorative elements based on tone -->
    <div class="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-30"
      :class="decorativeGradientClass"></div>
    <div class="absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-30"
      :class="decorativeGradientClass"></div>
    
    <div class="relative">
      <!-- Scenario Header -->
      <div class="mb-8">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 class="text-2xl md:text-3xl font-bold text-future-dark dark:text-future-light">{{ scenario.title }}</h2>
          <span class="px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center gap-1"
            :class="toneClass">
            <span class="material-icons text-sm">{{ toneIcon }}</span>
            {{ scenario.tone }} Perspective
          </span>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-6">
          <span class="badge badge-primary flex items-center gap-1">
            <span class="material-icons text-xs">memory</span>
            {{ scenario.technology.name }}
          </span>
          <span class="badge badge-secondary flex items-center gap-1">
            <span class="material-icons text-xs">insights</span>
            {{ scenario.consequence.name }}
          </span>
          <span class="badge badge-accent flex items-center gap-1">
            <span class="material-icons text-xs">schedule</span>
            {{ scenario.timeframe.name }}
          </span>
        </div>
        
        <div class="h-1 w-full bg-gradient-to-r rounded-full" :class="gradientClass"></div>
      </div>
      
      <!-- Scenario Content -->
      <div class="prose prose-lg max-w-none dark:prose-invert">
        <div v-for="(paragraph, index) in paragraphs" :key="index" 
          class="mb-4 transition-all duration-500"
          :style="{ animationDelay: `${index * 200}ms` }"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: index * 200 } }">
          <p>{{ paragraph }}</p>
        </div>
      </div>
      
      <!-- Visual Element based on scenario -->
      <div class="mt-8 p-6 rounded-lg" :class="visualBackgroundClass">
        <div class="flex flex-col md:flex-row md:items-center gap-6">
          <div class="md:flex-1">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <span class="material-icons" :class="iconTextClass">lightbulb</span>
              Key Implications
            </h3>
            <ul class="space-y-2">
              <li v-for="(example, index) in scenario.technology.examples" :key="index"
                class="flex items-start gap-2">
                <span class="material-icons text-sm mt-1" :class="iconTextClass">arrow_right</span>
                <span>{{ example }}</span>
              </li>
            </ul>
          </div>
          <div class="hidden md:block">
            <div class="w-32 h-32 rounded-full flex items-center justify-center animate-float" :class="iconBackgroundClass">
              <span class="text-6xl" :class="iconTextClass">{{ getIconForTechnology(scenario.technology.id) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Timeline visualization -->
      <div class="mt-8 relative">
        <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
          <span class="material-icons text-future-primary">timeline</span>
          Timeline
        </h3>
        
        <div class="h-1 bg-gray-200 dark:bg-gray-700 rounded-full relative">
          <div class="absolute top-0 left-0 h-full rounded-full" 
            :class="timelineProgressClass"
            :style="{ width: timelineWidth }"></div>
          
          <div class="absolute -top-1 left-0 w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500">
            <span class="absolute -top-8 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Present</span>
          </div>
          
          <div class="absolute -top-1 left-1/3 w-3 h-3 rounded-full" :class="timelineNearClass">
            <span class="absolute -top-8 -translate-x-1/2 text-xs whitespace-nowrap" :class="timelineTextClass('near')">2025-2030</span>
          </div>
          
          <div class="absolute -top-1 left-2/3 w-3 h-3 rounded-full" :class="timelineMidClass">
            <span class="absolute -top-8 -translate-x-1/2 text-xs whitespace-nowrap" :class="timelineTextClass('mid')">2030-2040</span>
          </div>
          
          <div class="absolute -top-1 right-0 w-3 h-3 rounded-full" :class="timelineFarClass">
            <span class="absolute -top-8 -translate-x-1/2 text-xs whitespace-nowrap" :class="timelineTextClass('far')">2040+</span>
          </div>
        </div>
      </div>
      
      <!-- Generated Date -->
      <div class="mt-8 text-sm text-gray-500 dark:text-gray-400 text-right flex items-center justify-end gap-2">
        <span class="material-icons text-sm">calendar_today</span>
        Generated on: {{ formatDate(scenario.date) }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ScenarioDisplay',
  props: {
    scenario: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // Split narrative into paragraphs
    const paragraphs = computed(() => {
      return props.scenario.narrative.split('\n\n').filter(p => p.trim() !== '')
    })
    
    // Dynamic classes based on tone
    const gradientClass = computed(() => {
      const toneClasses = {
        utopian: 'from-future-secondary to-future-primary',
        dystopian: 'from-future-error to-future-primary',
        ambiguous: 'from-future-accent to-future-primary'
      }
      return toneClasses[props.scenario.tone] || toneClasses.ambiguous
    })
    
    const decorativeGradientClass = computed(() => {
      const toneClasses = {
        utopian: 'bg-future-secondary',
        dystopian: 'bg-future-error',
        ambiguous: 'bg-future-accent'
      }
      return toneClasses[props.scenario.tone] || toneClasses.ambiguous
    })
    
    const visualBackgroundClass = computed(() => {
      const toneClasses = {
        utopian: 'bg-future-secondary/10 dark:bg-future-secondary/20 border border-future-secondary/20',
        dystopian: 'bg-future-error/10 dark:bg-future-error/20 border border-future-error/20',
        ambiguous: 'bg-future-accent/10 dark:bg-future-accent/20 border border-future-accent/20'
      }
      return toneClasses[props.scenario.tone] || toneClasses.ambiguous
    })
    
    const iconBackgroundClass = computed(() => {
      const toneClasses = {
        utopian: 'bg-future-secondary/20 dark:bg-future-secondary/30',
        dystopian: 'bg-future-error/20 dark:bg-future-error/30',
        ambiguous: 'bg-future-accent/20 dark:bg-future-accent/30'
      }
      return toneClasses[props.scenario.tone] || toneClasses.ambiguous
    })
    
    const iconTextClass = computed(() => {
      const toneClasses = {
        utopian: 'text-future-secondary',
        dystopian: 'text-future-error',
        ambiguous: 'text-future-accent'
      }
      return toneClasses[props.scenario.tone] || toneClasses.ambiguous
    })
    
    const toneClass = computed(() => {
      const toneClasses = {
        utopian: 'bg-future-secondary/10 text-future-secondary dark:bg-future-secondary/20',
        dystopian: 'bg-future-error/10 text-future-error dark:bg-future-error/20',
        ambiguous: 'bg-future-accent/10 text-future-accent dark:bg-future-accent/20'
      }
      return toneClasses[props.scenario.tone] || toneClasses.ambiguous
    })
    
    const toneIcon = computed(() => {
      const icons = {
        utopian: 'sentiment_very_satisfied',
        dystopian: 'sentiment_very_dissatisfied',
        ambiguous: 'sentiment_neutral'
      }
      return icons[props.scenario.tone] || icons.ambiguous
    })
    
    // Timeline visualization
    const timelineWidth = computed(() => {
      const timeframeWidths = {
        near: '33%',
        mid: '66%',
        far: '100%',
        distant: '100%'
      }
      return timeframeWidths[props.scenario.timeframe.id] || '0%'
    })
    
    const timelineProgressClass = computed(() => {
      const toneClasses = {
        utopian: 'bg-future-secondary',
        dystopian: 'bg-future-error',
        ambiguous: 'bg-future-accent'
      }
      return toneClasses[props.scenario.tone] || toneClasses.ambiguous
    })
    
    const timelineNearClass = computed(() => {
      if (props.scenario.timeframe.id === 'near') {
        return timelineProgressClass.value
      }
      return props.scenario.timeframe.id === 'mid' || props.scenario.timeframe.id === 'far' || props.scenario.timeframe.id === 'distant' 
        ? timelineProgressClass.value 
        : 'bg-gray-400 dark:bg-gray-500'
    })
    
    const timelineMidClass = computed(() => {
      if (props.scenario.timeframe.id === 'mid') {
        return timelineProgressClass.value
      }
      return props.scenario.timeframe.id === 'far' || props.scenario.timeframe.id === 'distant'
        ? timelineProgressClass.value 
        : 'bg-gray-400 dark:bg-gray-500'
    })
    
    const timelineFarClass = computed(() => {
      if (props.scenario.timeframe.id === 'far' || props.scenario.timeframe.id === 'distant') {
        return timelineProgressClass.value
      }
      return 'bg-gray-400 dark:bg-gray-500'
    })
    
    const timelineTextClass = (timeframe) => {
      if (
        (timeframe === 'near' && props.scenario.timeframe.id === 'near') ||
        (timeframe === 'mid' && props.scenario.timeframe.id === 'mid') ||
        (timeframe === 'far' && (props.scenario.timeframe.id === 'far' || props.scenario.timeframe.id === 'distant'))
      ) {
        const toneClasses = {
          utopian: 'text-future-secondary font-medium',
          dystopian: 'text-future-error font-medium',
          ambiguous: 'text-future-accent font-medium'
        }
        return toneClasses[props.scenario.tone] || toneClasses.ambiguous
      }
      return 'text-gray-500 dark:text-gray-400'
    }
    
    // Get an appropriate icon for the technology
    const getIconForTechnology = (techId) => {
      const icons = {
        ai: '🤖',
        quantum: '⚛️',
        biotech: '🧬',
        renewable: '♻️',
        autonomous: '🚗',
        bci: '🧠',
        space: '🚀'
      }
      return icons[techId] || '🔮'
    }
    
    // Format date for display
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    }
    
    return {
      paragraphs,
      gradientClass,
      decorativeGradientClass,
      visualBackgroundClass,
      iconBackgroundClass,
      iconTextClass,
      toneClass,
      toneIcon,
      timelineWidth,
      timelineProgressClass,
      timelineNearClass,
      timelineMidClass,
      timelineFarClass,
      timelineTextClass,
      getIconForTechnology,
      formatDate
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.prose p {
  animation: fadeIn 0.5s ease-out forwards;
  animation-play-state: paused;
}

.prose p.visible {
  animation-play-state: running;
}
</style>