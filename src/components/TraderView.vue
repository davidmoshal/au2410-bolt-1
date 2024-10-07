<template>
  <div>
    <h2 class="text-3xl font-bold mb-6">Trader View</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4">Auction Information</h3>
        <ClockDisplay :round-number="roundNumber" :round-price="roundPrice" :time-remaining="timeRemaining" :price-units="priceUnits" />
        <p class="mt-4 text-lg font-semibold">Auction State: {{ auctionState }}</p>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4">Current Order</h3>
        <div class="flex items-center space-x-4">
          <span class="text-lg">Quantity: {{ currentQuantity }}</span>
          <input
            v-model.number="newQuantity"
            type="number"
            min="0"
            class="border border-gray-300 rounded-md p-2 w-24"
            :disabled="auctionState !== 'running'"
          />
          <button 
            @click="updateQuantity" 
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            :disabled="auctionState !== 'running'"
          >
            Update
          </button>
        </div>
      </div>
    </div>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4">Trader History</h3>
        <TraderHistoryTable :history="traderHistory" />
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4">Chat</h3>
        <div class="h-64 overflow-y-auto mb-4">
          <div v-for="(message, index) in messages" :key="index" class="mb-4">
            <div class="font-semibold">{{ message.sender }}</div>
            <div class="text-sm text-gray-500">{{ formatDate(message.timestamp) }}</div>
            <div class="mt-1 p-2 bg-gray-100 rounded">{{ message.text }}</div>
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="flex">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ClockDisplay from './ClockDisplay.vue';
import TraderHistoryTable from './TraderHistoryTable.vue';

interface Message {
  sender: string;
  text: string;
  timestamp: Date;
}

const props = defineProps<{
  auctionState: string;
  auctionName: string;
  messages: Message[];
}>();

const emit = defineEmits(['new-message']);

const roundNumber = ref(1);
const roundPrice = ref(100);
const timeRemaining = ref(60);
const priceUnits = ref('$');
const currentQuantity = ref(0);
const newQuantity = ref(0);
const newMessage = ref('');

const traderHistory = ref([
  { round: 1, trader: 'You', price: 100, quantity: 10, activity: 'Medium' },
  { round: 2, trader: 'You', price: 110, quantity: 8, activity: 'Low' },
  { round: 3, trader: 'You', price: 120, quantity: 12, activity: 'High' },
  { round: 1, trader: 'Trader A', price: 100, quantity: 15, activity: 'High' },
  { round: 2, trader: 'Trader A', price: 110, quantity: 10, activity: 'Medium' },
  { round: 3, trader: 'Trader A', price: 120, quantity: 5, activity: 'Low' },
]);

const updateQuantity = () => {
  currentQuantity.value = newQuantity.value;
  // Here you would typically send this update to the server
};

const sendMessage = () => {
  if (newMessage.value.trim()) {
    const message: Message = {
      sender: 'Trader',
      text: newMessage.value.trim(),
      timestamp: new Date()
    };
    emit('new-message', message);
    newMessage.value = '';
  }
};

const formatDate = (date: Date) => {
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });
};
</script>