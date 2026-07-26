<template>
  <UHeader :ui="{ container: 'max-w-none' }">
    <template #title>
      <Logo class="h-6 w-auto" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton class="cursor-pointer" />

      <UButton
        v-if="!isAuthenticated"
        class="cursor-pointer"
        color="primary"
        variant="solid"
        >登录</UButton
      >
      <UPopover
        v-else
        mode="hover"
        :close-delay="100"
        :content="{ side: 'bottom', align: 'end' }"
      >
        <UAvatar
          src="https://github.com/benjamincanac.png"
          loading="lazy"
          class="cursor-pointer"
        />
        <template #content>
          <div class="py-1">
            <button
              v-for="item in menuItems"
              :key="item.label"
              class="w-full px-3 py-2 text-left text-sm text-default hover:bg-elevated cursor-pointer rounded-md"
            >
              {{ item.label }}
            </button>
          </div>
        </template>
      </UPopover>
    </template>
  </UHeader>
</template>
<script setup lang="ts">
const isAuthenticated = ref(true);

const items = ref([
  {
    label: "首页",
    to: "/",
  },
  {
    label: "提交推荐",
    to: "/about",
  },
  {
    label: "文档",
    to: "/docs",
  },
]);

const menuItems = ref([
  {
    label: "个人中心",
    to: "/profile",
  },
  {
    label: "设置",
    to: "/settings",
  },
  {
    label: "退出登录",
    to: "/logout",
  },
]);
</script>
