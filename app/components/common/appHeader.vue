<template>
  <UHeader :ui="{ container: 'max-w-none' }" class="border-t border-slate-50">
    <template #title>
      <!-- <Logo class="h-6 w-auto" /> -->
      logo
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UButton v-if="!isAuthenticated" color="primary" variant="solid" @click="$router.push('/login')"
        >登录</UButton
      >
      <UPopover
        v-else
        mode="hover"
        :close-delay="100"
        :content="{ side: 'bottom', align: 'end' }"
      >
        <UAvatar
          :src="session.data?.user?.image"
          loading="lazy"
          class="cursor-pointer"
        />
        <template #content>
          <div class="py-1">
            <UButton
              v-for="item in menuItems"
              :color="item.key === 'logout' ? 'error' : 'neutral'"
              variant="link"
              :key="item.label"
              class="w-full px-3 py-2 text-left text-sm cursor-pointer rounded-md"
              @click="
                item.key !== 'logout' && item.to
                  ? $router.push(item.to)
                  : $auth.signOut()
              "
            >
              {{ item.label }}
            </UButton>
          </div>
        </template>
      </UPopover>
    </template>
  </UHeader>
</template>
<script setup lang="ts">
const session = useAuthSession();
const isAuthenticated = computed(() => !!session.value?.data?.user);
const items = ref([
  {
    label: "首页",
    to: "/",
  },
  {
    label: "提交推荐",
    to: "/recommend",
  },
  {
    label: "文档",
    to: "/docs",
  },
]);

const menuItems = computed(() => {
  return [
    {
      label: "个人中心",
      key: "userInfo",
      to: "/user/info",
    },
    {
      label: "设置",
      key: "settings",
      to: "/settings",
    },
    {
      label: "退出登录",
      key: "logout",
    },
  ];
});
</script>
