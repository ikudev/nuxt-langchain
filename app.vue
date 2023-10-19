<script setup>
import { useChat } from 'ai/vue';

const { messages, input, handleSubmit } = useChat({
  headers: { 'Content-Type': 'application/json' },
});

function isMessageFromUser(message) {
  return message.role === 'user';
}
</script>

<template>
  <div class="container w-1/2 mx-auto flex flex-col gap-2 h-screen">
    <div
      class="overflow-scroll h-screen border border-solid border-gray-300 rounded p-4"
    >
      <template v-for="message in messages" :key="message.id">
        <div
          class="whitespace-pre-wrap chat"
          :class="[isMessageFromUser(message) ? 'chat-end' : 'chat-start']"
        >
          <div class="chat-image flex flex-col items-center">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img
                  :src="isMessageFromUser(message) ? '/user.png' : '/ai.png'"
                />
              </div>
            </div>
            <strong>
              {{ isMessageFromUser(message) ? 'User' : 'AI' }}
            </strong>
          </div>
          <div class="chat-header"></div>
          <div
            class="chat-bubble"
            :class="
              isMessageFromUser(message)
                ? 'chat-bubble-secondary'
                : 'chat-bubble-primary'
            "
          >
            {{ message.content }}
          </div>
        </div>
      </template>
    </div>

    <form @submit="handleSubmit">
      <input
        v-model="input"
        class="w-full p-2 mb-8 border border-gray-300 rounded shadow-xl outline-none"
        placeholder="Say something..."
      />
    </form>
  </div>
</template>
