<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="px-4 py-2 border sticky left-0 z-10 bg-white">Data</th>
          <th v-for="round in rounds" :key="round" class="px-4 py-2 border">Round {{ round }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-4 py-2 border font-semibold sticky left-0 z-10 bg-white">Round Price</td>
          <td v-for="round in rounds" :key="round" class="px-4 py-2 border">{{ getRoundPrice(round) }}</td>
        </tr>
        <tr>
          <td class="px-4 py-2 border font-semibold sticky left-0 z-10 bg-white">Quantity</td>
          <td v-for="round in rounds" :key="round" class="px-4 py-2 border">{{ getQuantity(round) }}</td>
        </tr>
        <tr>
          <td class="px-4 py-2 border font-semibold sticky left-0 z-10 bg-white">Activity</td>
          <td v-for="round in rounds" :key="round" class="px-4 py-2 border">{{ getActivity(round) }}</td>
        </tr>
        <tr v-for="trader in traders" :key="trader">
          <td class="px-4 py-2 border font-semibold sticky left-0 z-10 bg-white">Trader {{ trader }}</td>
          <td v-for="round in rounds" :key="round" class="px-4 py-2 border">{{ getTraderQuantity(trader, round) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface RoundData {
  price: number;
  quantity: number;
  activity: 'H' | 'M' | 'L';
  traders: {
    [traderId: string]: number;
  };
}

interface Props {
  roundData: {
    [round: number]: RoundData;
  };
}

const props = defineProps<Props>();

const rounds = computed(() => Object.keys(props.roundData).map(Number).sort((a, b) => a - b));
const traders = computed(() => {
  const allTraders = new Set<string>();
  Object.values(props.roundData).forEach(round => {
    Object.keys(round.traders).forEach(trader => allTraders.add(trader));
  });
  return Array.from(allTraders).sort();
});

const getRoundPrice = (round: number) => props.roundData[round]?.price || '-';
const getQuantity = (round: number) => props.roundData[round]?.quantity || '-';
const getActivity = (round: number) => props.roundData[round]?.activity || '-';
const getTraderQuantity = (trader: string, round: number) => props.roundData[round]?.traders[trader] || '-';
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