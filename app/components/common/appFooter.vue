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
      <template v-if="friendLinks && friendLinks.length">
        <UButton v-for="item in friendLinks" class="text-dimmed" :key="item.id" :to="item.url" variant="link">
          {{ item.name }}
        </UButton>
      </template>
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

const { data: friendLinks } = await useFetch('/api/friend-links');

</script>
