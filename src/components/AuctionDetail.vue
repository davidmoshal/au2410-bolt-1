<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <button @click="onBack" class="mb-4 flex items-center text-blue-600 hover:text-blue-800">
      <ArrowLeft :size="20" class="mr-2" />
      Back to Auctions
    </button>
    <img :src="auction.imageUrl" :alt="auction.title" class="w-full h-64 object-cover rounded-lg mb-4" />
    <h2 class="text-2xl font-bold mb-2">{{ auction.title }}</h2>
    <p class="text-gray-600 mb-4">{{ auction.description }}</p>
    <div class="flex justify-between items-center mb-4">
      <span class="text-2xl font-bold text-green-600">${{ auction.currentBid }}</span>
      <div class="flex items-center text-gray-500">
        <Clock :size="20" class="mr-2" />
        <span>Ends at {{ new Date(auction.endTime).toLocaleString() }}</span>
      </div>
    </div>
    <form @submit.prevent="handleBid" class="mb-6">
      <div class="flex">
        <input
          v-model="bidAmount"
          type="number"
          placeholder="Enter your bid"
          class="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          step="0.01"
          :min="auction.currentBid + 0.01"
          required
        />
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
        >
          Place Bid
        </button>
      </div>
    </form>
    <h3 class="text-xl font-semibold mb-2">Bid History</h3>
    <ul v-if="bids.length > 0" class="space-y-2">
      <li v-for="(bid, index) in bids" :key="index" class="flex justify-between items-center bg-gray-100 p-2 rounded">
        <span>{{ bid.bidder }}</span>
        <span class="font-semibold">${{ bid.amount }}</span>
        <span class="text-sm text-gray-500">{{ bid.timestamp.toLocaleString() }}</span>
      </li>
    </ul>
    <p v-else class="text-gray-500">No bids yet. Be the first to bid!</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, Clock } from 'lucide-vue-next';
import { Auction, Bid } from '../types';

const props = defineProps<{
  auction: Auction;
}>();

const emit = defineEmits<{
  (e: 'back'): void;
}>();

const bidAmount = ref('');
const bids = ref<Bid[]>([]);

const onBack = () => {
  emit('back');
};

const handleBid = () => {
  const amount = parseFloat(bidAmount.value);
  if (amount > props.auction.currentBid) {
    const newBid: Bid = {
      auctionId: props.auction.id,
      amount,
      bidder: 'You',
      timestamp: new Date(),
    };
    bids.value = [newBid, ...bids.value];
    props.auction.currentBid = amount;
    bidAmount.value = '';
  } else {
    alert('Your bid must be higher than the current bid.');
  }
};
</script>