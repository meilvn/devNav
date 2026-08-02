<template>
  <NuxtLayout name="admin">
    <template #title> 仪表盘 </template>
    <div class="flex justify-between items-center gap-4">
      <UCard class="flex-1" v-for="count in counts" :key="count.title">
        <template #header>
          <p class="text-md font-bold">{{ count.title }}</p>
        </template>
        <p>{{ count.count }}</p>
      </UCard>
    </div>
    <div class="mt-4">
      <UTable :columns="columns" :data="tblData" />
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Navigation } from "~/types/navigation";

definePageMeta({
  layout: false,
});

const tblData = ref([]);

const counts = [
  {
    title: "总导航数",
    count: 1000,
  },
  {
    title: "总用户数",
    count: 500,
  },
  {
    title: "待审核数",
    count: 100,
  },
  {
    title: "书签总数",
    count: 2000,
  },
];

// 待审核的导航
const columns: TableColumn<Navigation>[] = [
  {
    accessorKey: "title",
    header: "标题",
  },
  {
    accessorKey: "description",
    header: "描述",
  },
  {
    accessorKey: "category_id",
    header: "分类",
  },
  {
    accessorKey: "tags",
    header: "标签",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "submitter",
    header: "提交人",
  },
  {
    accessorKey: "created_at",
    header: "提交时间",
  },
  {
    accessorKey: "status",
    header: "状态",
  },
  {
    accessorKey: "actions",
    header: "操作",
  },
];
</script>
