<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="px-4 py-2 border sticky left-0 z-10 bg-white">Round</th>
          <th class="px-4 py-2 border">Trader</th>
          <th class="px-4 py-2 border">Price</th>
          <th class="px-4 py-2 border">Quantity</th>
          <th class="px-4 py-2 border">Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in history" :key="`${entry.round}-${entry.trader}`">
          <td class="px-4 py-2 border sticky left-0 z-10 bg-white">{{ entry.round }}</td>
          <td class="px-4 py-2 border">{{ entry.trader }}</td>
          <td class="px-4 py-2 border">${{ entry.price }}</td>
          <td class="px-4 py-2 border">{{ entry.quantity }}</td>
          <td class="px-4 py-2 border">
            <span :class="getActivityClass(entry.activity)">
              {{ entry.activity }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

interface HistoryEntry {
  round: number;
  trader: string;
  price: number;
  quantity: number;
  activity: 'Low' | 'Medium' | 'High';
}

defineProps({
  history: {
    type: Array as PropType<HistoryEntry[]>,
    required: true,
  },
});

const getActivityClass = (activity: string) => {
  switch (activity) {
    case 'Low':
      return 'text-green-600';
    case 'Medium':
      return 'text-yellow-600';
    case 'High':
      return 'text-red-600';
    default:
      return '';
  }
};
</script>

<style scoped>
.overflow-x-auto {
  overflow-x: auto;
  max-width: 100%;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}

th, td {
  white-space: nowrap;
}
</style>