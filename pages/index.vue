<template>
  <div>
    <h3>Hi, I am a company naming bot.</h3>
    <form @submit.prevent="handleSubmit" class="form-control">
      <label class="label">
        <strong class="label-text text-lg">
          What product/service does your company make or provide?
        </strong>
      </label>
      <div class="flex gap-2">
        <input v-model="input" class="input input-bordered input-info w-full" />
        <button
          type="submit"
          class="btn btn-outline btn-primary rounded-lg w-32 mx-auto"
        >
          Give a name
        </button>
      </div>
    </form>
    <br />
    <p class="text-lg font-semibold">
      {{ completion }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useCompletion } from 'ai/vue';

const { input, handleSubmit, completion } = useCompletion();
</script>

<style></style>
