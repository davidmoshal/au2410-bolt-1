<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center">
          <Clock :size="32" class="mr-2" />
          <h1 class="text-2xl font-bold">Clock Auction App</h1>
        </div>
        <div class="flex items-center">
          <span class="mr-4">{{ auctionName }}</span>
          <button v-if="isAuctioneer" @click="toggleChatWindow" class="relative mr-4">
            <MessageSquare :size="24" />
            <span v-if="unreadMessages > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ unreadMessages }}
            </span>
          </button>
          <button @click="toggleView" class="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">
            Switch to {{ isAuctioneer ? 'Trader' : 'Auctioneer' }} View
          </button>
        </div>
      </div>
    </header>
    <main class="container mx-auto py-8 relative">
      <AuctioneerView v-if="isAuctioneer" 
        :auction-state="auctionState"
        :auction-name="auctionName"
        @update-state="updateAuctionState"
      />
      <TraderView v-else 
        :auction-state="auctionState"
        :auction-name="auctionName"
        :messages="messages"
        @new-message="handleNewMessage"
      />
      <ChatSystem v-if="isAuctioneer"
        :role="'Auctioneer'"
        :is-open="isChatOpen"
        :messages="messages"
        @close="closeChatWindow"
        @new-message="handleNewMessage"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Clock, MessageSquare } from 'lucide-vue-next';
import AuctioneerView from './components/AuctioneerView.vue';
import TraderView from './components/TraderView.vue';
import ChatSystem from './components/ChatSystem.vue';

const isAuctioneer = ref(false);
const auctionState = ref('idle');
const auctionName = ref('Sample Auction');
const isChatOpen = ref(false);
const unreadMessages = ref(0);

interface Message {
  sender: string;
  text: string;
  timestamp: Date;
}

const messages = ref<Message[]>([]);

const toggleView = () => {
  isAuctioneer.value = !isAuctioneer.value;
  if (!isAuctioneer.value) {
    unreadMessages.value = 0;
  }
};

const updateAuctionState = (newState: string) => {
  auctionState.value = newState;
};

const toggleChatWindow = () => {
  isChatOpen.value = !isChatOpen.value;
  if (isChatOpen.value) {
    unreadMessages.value = 0;
  }
};

const closeChatWindow = () => {
  isChatOpen.value = false;
};

const handleNewMessage = (message: Message) => {
  messages.value.push(message);
  if (isAuctioneer.value && !isChatOpen.value) {
    unreadMessages.value++;
  }
};

onMounted(() => {
  // Generate 20 random messages
  const senders = ['Auctioneer', 'Trader1', 'Trader2', 'Trader3', 'Trader4'];
  const randomMessages = [
    "What's the current bid?",
    "I'm increasing my quantity.",
    "When does this round end?",
    "The market is looking volatile today.",
    "Can you clarify the auction rules?",
    "I'm out for this round.",
    "Interesting price movement!",
    "How many rounds are left?",
    "I'm all in!",
    "What's the total quantity so far?"
  ];

  for (let i = 0; i < 20; i++) {
    const sender = senders[i % 5];
    const text = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 3600000)); // Random time within the last hour
    messages.value.push({ sender, text, timestamp });
  }

  // Sort messages by timestamp
  messages.value.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
});
</script>