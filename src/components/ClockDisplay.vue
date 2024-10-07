<template>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-lg font-semibold">Round: {{ roundNumber }}</p>
      <p class="text-lg font-semibold">Price: {{ priceUnits }}{{ roundPrice }}</p>
    </div>
    <div class="relative w-24 h-24">
      <svg class="w-full h-full" viewBox="0 0 100 100">
        <circle
          class="text-gray-200 stroke-current"
          stroke-width="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          class="text-blue-600 progress-ring stroke-current"
          stroke-width="10"
          stroke-linecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          :style="{ strokeDashoffset }"
        ></circle>
      </svg>
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span class="text-2xl font-bold">{{ timeRemaining }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  roundNumber: number;
  roundPrice: number;
  timeRemaining: number;
  priceUnits: string;
}>();

const strokeDashoffset = computed(() => {
  const circumference = 2 * Math.PI * 40;
  return circumference - (props.timeRemaining / 60) * circumference;
});
</script>

<style scoped>
.progress-ring {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke-dasharray: 251.327;
}
</style>