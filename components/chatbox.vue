<template>
  <div class="flex flex-col gap-2">
    <div
      class="overflow-scroll border border-solid border-gray-300 rounded p-4 h-[90%]"
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
              {{ isMessageFromUser(message) ? 'Me' : 'AI' }}
            </strong>
          </div>
          <div class="chat-header"></div>
          <div
            class="chat-bubble mb-4"
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

<script lang="ts" setup>
import { useChat } from 'ai/vue';

const { messages, input, handleSubmit } = useChat({
  headers: { 'Content-Type': 'application/json' }
});

function isMessageFromUser(message: any) {
  return message.role === 'user';
}
</script>

<style></style>
