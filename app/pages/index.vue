<template>
  <div>
    <div class="flex items-center gap-2 mb-4">
      <UButton v-for="item in categorys" size="lg" color="neutral" activeColor="primary" variant="outline"
        activeVariant="solid" :active="currentCategory === item.name" :key="item.name"
        class="font-bold rounded-full cursor-pointer" @click="switchCategory(item.name)">{{ item.name }}</UButton>
    </div>
    <div class="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      <CategoryCard v-for="item in navigationList" :key="item.id" :category="item" />
    </div>
  </div>
</template>
<script setup lang="ts">
const { data: categorys } = await useFetch("/api/categories");
const { navigationList, loading, switchCategory } = useNavigation();
const currentCategory = ref("all");

useSeoMeta({
  title: "首页",
  description:
    "A navigation tool for developers to quickly access various resources and tools.",
});

onMounted(() => {

});
</script>
