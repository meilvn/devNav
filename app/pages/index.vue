<template>
  <div>
    <div class="flex items-center gap-2 mb-4">
      <UButton
        size="lg"
        color="neutral"
        activeColor="primary"
        variant="outline"
        activeVariant="solid"
        :active="currentCategory === -1"
        class="font-bold rounded-full cursor-pointer"
        @click="
          currentCategory = -1;
          switchCategory();
        "
        >{{ "全部" }}</UButton
      >
      <UButton
        v-for="item in categorys"
        size="lg"
        color="neutral"
        activeColor="primary"
        variant="outline"
        activeVariant="solid"
        :active="currentCategory === item.id"
        :key="item.name"
        class="font-bold rounded-full cursor-pointer"
        @click="
          currentCategory = item.id;
          switchCategory(item.id);
        "
        >{{ item.name }}</UButton
      >
    </div>
    <div class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
      <CategorySkeleton v-if="loading" v-for="item in 4" :key="item" />
      <CategoryCard
        v-else
        v-for="item in navigationList"
        :key="item.id"
        :category="item"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const { data: categorys } = await useFetch("/api/categories");
const { navigationList, loading, switchCategory } = useNavigation();
const currentCategory = ref(-1);

useSeoMeta({
  title: "首页",
  description:
    "A navigation tool for developers to quickly access various resources and tools.",
});

onMounted(() => {});
</script>
