<template>
  <div class="flex flex-1 min-h-screen bg-neutral-50 dark:bg-neutral-950">
    <USidebar
      v-model:open="open"
      collapsible="icon"
      rail
      variant="inset"
      :ui="{
        container: 'h-full',
      }"
    >
      <template #header>
        <UIcon name="i-logos-nuxt-icon" class="size-8" />
        <h1 class="text-3xl font-bold text-center text-ink-primary mb-2">
          DevNav
        </h1>
      </template>

      <template #default="{ state }">
        <UNavigationMenu
          :key="state"
          :items="items"
          orientation="vertical"
          :ui="{ link: 'p-1.5 overflow-hidden' }"
        />
      </template>

      <template #footer>
        <UButton v-if="!user" to="/login">登录</UButton>
        <UDropdownMenu
          v-else
          :items="userItems"
          :content="{ align: 'center', collisionPadding: 12 }"
          :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
        >
          <UButton
            v-bind="user"
            :label="user?.name"
            trailing-icon="i-lucide-chevrons-up-down"
            color="neutral"
            variant="ghost"
            square
            class="w-full data-[state=open]:bg-elevated overflow-hidden"
            :ui="{
              trailingIcon: 'text-dimmed ms-auto',
            }"
          />
        </UDropdownMenu>
      </template>
    </USidebar>

    <div
      class="flex-1 flex flex-col overflow-hidden bg-default peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default"
    >
      <div
        class="h-(--ui-header-height) shrink-0 flex items-center px-4 border-b border-default"
      >
        <UButton
          icon="i-lucide-panel-left"
          color="neutral"
          variant="ghost"
          aria-label="Toggle sidebar"
          @click="open = !open"
        />
        <h1 class="text-xl font-bold text-center text-ink-primary ml-2">
          <slot name="title"></slot>
        </h1>
      </div>

      <div class="flex-1 p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { DropdownMenuItem, NavigationMenuItem } from "@nuxt/ui";

const open = ref(true);
const auth = useAuth();
const user = computed(() => {
  // return session.value?.user;
  return {
    name: 'admin',
  }
});

const userItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: "Profile",
      icon: "i-lucide-user",
    },
    {
      label: "Billing",
      icon: "i-lucide-credit-card",
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      to: "/settings",
    },
  ],
  [
    {
      label: "GitHub",
      icon: "i-simple-icons-github",
      to: "https://github.com/nuxt/ui",
      target: "_blank",
    },
    {
      label: "Log out",
      icon: "i-lucide-log-out",
      onClick: async () => {
        await auth.signOut();
        navigateTo("/login");
      },
    },
  ],
]);

const items = ref<NavigationMenuItem[]>([
  {
    label: "仪表盘",
    icon: "i-lucide-home",
    to: "/admin",
  },
  {
    label: "用户管理",
    icon: "i-lucide-users",
    to: "/admin/users",
  },
  {
    label: "导航管理",
    icon: "i-lucide-menu",
    to: "/admin/nav",
  },
  {
    label: "分类管理",
    icon: "i-lucide-folder",
    to: "/admin/categories",
  },
  {
    label: "审核管理",
    icon: "i-lucide-check",
    to: "/admin/audit",
  },
  {
    label: "友情链接",
    icon: "i-lucide-link",
    to: "/admin/links",
  },
]);
</script>
