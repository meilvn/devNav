<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts">

useHead({
  titleTemplate: (title) => (title ? "%s - Dev Navigation" : "Dev Navigation"),
});
</script>
