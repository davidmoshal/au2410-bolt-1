<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="auction in auctions"
      :key="auction.id"
      class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
      @click="onSelectAuction(auction)"
    >
      <img :src="auction.imageUrl" :alt="auction.title" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">{{ auction.title }}</h3>
        <p class="text-gray-600 mb-2">{{ auction.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-green-600 font-bold">${{ auction.currentBid }}</span>
          <div class="flex items-center text-gray-500">
            <Clock :size="16" class="mr-1" />
            <span>{{ new Date(auction.endTime).toLocaleTimeString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Clock } from 'lucide-vue-next';
import { Auction } from '../types';

defineProps<{
  auctions: Auction[];
}>();

const emit = defineEmits<{
  (e: 'selectAuction', auction: Auction): void;
}>();

const onSelectAuction = (auction: Auction) => {
  emit('selectAuction', auction);
};
</script>