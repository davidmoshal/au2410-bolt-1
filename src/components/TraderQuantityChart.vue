<template>
  <div class="w-full h-80">
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const props = defineProps<{
  roundData: {
    [round: number]: {
      price: number;
      quantity: number;
      traders: {
        [traderId: string]: number;
      };
    };
  };
}>();

const chartData = computed(() => {
  if (!props.roundData || Object.keys(props.roundData).length === 0) {
    return null;
  }

  const rounds = Object.keys(props.roundData).map(Number).sort((a, b) => a - b);
  const traders = Array.from(new Set(rounds.flatMap(round => Object.keys(props.roundData[round].traders))));

  return {
    labels: rounds,
    datasets: traders.map((trader, index) => ({
      label: `Trader ${trader}`,
      data: rounds.map(round => props.roundData[round].traders[trader] || 0),
      borderColor: `hsl(${index * 360 / traders.length}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 360 / traders.length}, 70%, 50%, 0.5)`,
      fill: false,
      tension: 0.4,
    })),
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Round',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Quantity',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Trader Quantities by Round',
    },
  },
};
</script>