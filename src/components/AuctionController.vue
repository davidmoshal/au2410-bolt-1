<template>
  <div class="flex space-x-2">
    <button @click="handleAction('reset')" :class="getButtonClass('reset')" title="Reset">
      <RotateCcw :size="24" />
    </button>
    <button @click="handleAction('start')" :class="getButtonClass('start')" title="Start">
      <Play :size="24" />
    </button>
    <button @click="handleAction('pause')" :class="getButtonClass('pause')" title="Pause">
      <Pause :size="24" />
    </button>
    <button @click="handleAction('unpause')" :class="getButtonClass('unpause')" title="Unpause">
      <Play :size="24" />
    </button>
    <button @click="handleAction('end-round')" :class="getButtonClass('end-round')" title="End Round">
      <SkipForward :size="24" />
    </button>
    <button @click="handleAction('next-round')" :class="getButtonClass('next-round')" title="Next Round">
      <FastForward :size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { RotateCcw, Play, Pause, SkipForward, FastForward } from 'lucide-vue-next';

const props = defineProps<{
  currentState: string;
}>();

const emit = defineEmits(['reset', 'start', 'pause', 'unpause', 'end-round', 'next-round']);

const handleAction = (action: string) => {
  emit(action);
};

const getButtonClass = (action: string) => {
  const baseClass = "p-2 rounded-full transition-colors";
  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "bg-gray-200 text-gray-600 hover:bg-gray-300";
  
  if (action === 'reset') return `${baseClass} ${inactiveClass}`;
  if (action === 'start' && props.currentState === 'idle') return `${baseClass} ${activeClass}`;
  if (action === 'pause' && props.currentState === 'running') return `${baseClass} ${activeClass}`;
  if (action === 'unpause' && props.currentState === 'paused') return `${baseClass} ${activeClass}`;
  if (action === 'end-round' && props.currentState === 'running') return `${baseClass} ${activeClass}`;
  if (action === 'next-round' && props.currentState === 'round-ended') return `${baseClass} ${activeClass}`;
  
  return `${baseClass} ${inactiveClass}`;
};
</script>