<template>
  <div ref="chartContainer" class="w-full h-80"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Plotly from 'plotly.js-dist';
import { RoundData } from '../types';

const props = defineProps<{
  roundData: Record<number, RoundData>;
}>();

const chartContainer = ref<HTMLElement | null>(null);

const createChart = () => {
  if (!chartContainer.value || Object.keys(props.roundData).length === 0) return;

  const rounds = Object.keys(props.roundData).map(Number).sort((a, b) => a - b);
  const traders = Array.from(new Set(rounds.flatMap(round => Object.keys(props.roundData[round].traders))));

  const data = traders.map((trader, index) => ({
    z: rounds.map(round => props.roundData[round].traders[trader] || 0),
    x: rounds,
    y: Array(rounds.length).fill(trader),
    type: 'surface',
    name: `Trader ${trader}`,
    colorscale: [[0, `hsla(${index * 360 / traders.length}, 70%, 50%, 0.5)`], [1, `hsl(${index * 360 / traders.length}, 70%, 50%)`]],
    showscale: false,
  }));

  const layout = {
    title: 'Trader Quantities by Round',
    scene: {
      xaxis: { title: 'Round' },
      yaxis: { title: 'Trader' },
      zaxis: { title: 'Quantity' },
    },
    autosize: true,
    margin: { l: 0, r: 0, b: 0, t: 40 },
  };

  Plotly.newPlot(chartContainer.value, data, layout, { responsive: true });
};

onMounted(createChart);

watch(() => props.roundData, createChart, { deep: true });
</script>