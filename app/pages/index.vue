<template>
  <div>
    <Hero />
    <div class="flex items-center gap-2 mb-4">
      <UButton
        size="lg"
        color="neutral"
        activeColor="primary"
        variant="outline"
        activeVariant="solid"
        :active="currentCategory === -1"
        class="font-bold rounded-full"
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
      <CategorySkeleton v-show="pending" v-for="item in 4" :key="item" />
      <CategoryCard
        v-show="!pending"
        v-for="item in navigationList"
        :key="item.id"
        :category="item"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const { data: categorys } = useFetch("/api/categories");
const { navigationList, pending, switchCategory } = useNavigation();
console.log(navigationList.value);
const currentCategory = ref(-1);

useSeoMeta({
  title: "首页",
  description:
    "A navigation tool for developers to quickly access various resources and tools.",
});
</script>
