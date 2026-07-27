<template>
  <div>
    <div class="flex items-center gap-2 mb-4">
      <UButton
        v-for="item in categorys"
        size="lg"
        color="neutral"
        activeColor="primary"
        variant="outline"
        activeVariant="solid"
        :active="currentCategory === item.name"
        :key="item.name"
        class="font-bold rounded-full cursor-pointer"
        >{{ item.name }}</UButton
      >
    </div>
    <div class="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      <UCard v-for="item in bookmarks" :key="item.title">
        <template #header>
          {{ item.title }}
        </template>

        {{ item.description }}

        <template #footer>
          {{ item.category }} {{ item.tags.join(", ") }}
        </template>
      </UCard>
    </div>
  </div>
</template>
<script setup lang="ts">
const { data: categorys } = await useFetch("/api/categories");
const currentCategory = ref("all");
const bookmarks = ref<any[]>([]);  // todo: 定义 Bookmark 类型

onMounted(() => {
  // 初始化 bookmarks
  bookmarks.value = [
    {
      title: "前端资源",
      url: "https://www.frontendresources.com/",
      category: "frontend",
      description: "前端开发资源",
      icon: "https://www.frontendresources.com/favicon.ico",
      tags: ["前端", "资源"],
    },
    {
      title: "后端资源",
      url: "https://www.backendresources.com/",
      category: "backend",
      description: "后端开发资源",
      icon: "https://www.backendresources.com/favicon.ico",
      tags: ["后端", "资源"],
    },
  ];
});
</script>
