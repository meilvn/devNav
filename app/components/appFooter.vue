<template>
  <UFooter>
    <template #left>
      <div>
        <p class="text-default text-bold text-md">DevNav</p>
        <p class="text-muted text-sm">开发者导航与书签管理</p>
      </div>
    </template>

    <div class="flex items-center gap-2">
      <p class="text-muted text-sm font-bold">友情链接:</p>
      <UButton
        v-for="item in friendLinks"
        class="text-dimmed"
        :key="item.label"
        :to="item.to"
        variant="link"
      >
        {{ item.label }}
      </UButton>
    </div>

    <template #right>
      <p class="text-muted text-sm">
        Copyright © {{ year }}
      </p>
    </template>
  </UFooter>
</template>
<script setup lang="ts">
const year = useState('copyright-year', () => new Date().getFullYear());

const friendLinks = ref([
  {
    label: "Nuxt",
    to: "https://nuxt.com",
  },
  {
    label: "Nuxt.js",
    to: "https://nuxtjs.org",
  },
  {
    label: "Nuxt 3",
    to: "https://nuxt3.org",
  },
]);
</script>
