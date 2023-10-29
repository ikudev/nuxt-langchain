<template>
  <div class="container w-1/2 mx-auto flex flex-col h-screen">
    <div class="tabs">
      <NuxtLink
        v-for="rt in routes"
        class="tab tab-lg tab-lifted"
        :class="{ 'tab-active': rt.path === $route.path }"
        :to="rt.path"
      >
        {{ rt.name }}
      </NuxtLink>
    </div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const routes = [
  { name: 'Agent', path: '/' },
  { name: 'Chat', path: '/chat' }
];
</script>
