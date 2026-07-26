<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
<script setup lang="ts">
useSeoMeta({
  description:
    "A navigation tool for developers to quickly access various resources and tools.",
});

useHead({
  titleTemplate: (title) => (title ? "%s - Dev Navigation" : "Dev Navigation"),
});
</script>
