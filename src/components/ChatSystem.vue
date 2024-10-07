<template>
  <div :class="[
    'fixed inset-y-0 right-0 w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out transform',
    {'translate-x-0': isOpen, 'translate-x-full': !isOpen}
  ]">
    <div class="h-full flex flex-col">
      <div class="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h3 class="text-xl font-semibold">Chat</h3>
        <button @click="$emit('close')" class="text-white hover:text-gray-200">
          <X :size="24" />
        </button>
      </div>
      <div class="flex-grow overflow-y-auto p-4">
        <div v-for="(message, index) in messages" :key="index" class="mb-4">
          <div class="font-semibold">{{ message.sender }}</div>
          <div class="text-sm text-gray-500">{{ formatDate(message.timestamp) }}</div>
          <div class="mt-1 p-2 bg-gray-100 rounded">{{ message.text }}</div>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="p-4 border-t">
        <div class="flex">
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
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { X } from 'lucide-vue-next';

interface Message {
  sender: string;
  text: string;
  timestamp: Date;
}

const props = defineProps<{
  role: 'Auctioneer' | 'Trader';
  isOpen: boolean;
  messages: Message[];
}>();

const emit = defineEmits(['close', 'new-message']);

const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value.trim()) {
    const message: Message = {
      sender: props.role,
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