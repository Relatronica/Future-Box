<template>
  <div class="py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-6">
        Explore Future Scenarios
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Generate narratives about potential futures based on emerging technologies,
        their consequences, and timelines.
      </p>
      
      <ScenarioGenerator />
    </div>
  </div>
</template>

<script setup>
import ScenarioGenerator from '../components/ScenarioGenerator.vue';
</script>