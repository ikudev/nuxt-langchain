<template>
  <form @submit.prevent="handleSubmit">
    <label class="label">
      <strong class="label-text text-lg">{{ title }}</strong>
    </label>
    <div class="flex gap-2">
      <input
        v-model="input"
        class="input input-bordered input-info w-full"
        :placeholder="placeholder"
      />
      <button
        type="submit"
        class="btn btn-outline btn-primary rounded-lg fit-content mx-auto"
        :disabled="isLoading"
      >
        {{ buttonText }}
      </button>
    </div>
  </form>
  <br />
  <p class="text-lg font-semibold">
    {{ isLoading ? 'Thinking...' : completion }}
  </p>
</template>

<script lang="ts" setup>
import { useCompletion } from 'ai/vue';

const props = defineProps<{
  title: string;
  placeholder: string;
  buttonText: string;
  endpoint: string | 'completion';
}>();

const { input, handleSubmit, completion, isLoading } = useCompletion({
  api: `/api/${props.endpoint}`
});
</script>

<style></style>
