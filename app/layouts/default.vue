<template>
  <div class="flex flex-col h-screen">
    <AppHeader />
    <div class="flex flex-col flex-1 overflow-auto">
      <div class="flex-1 bg-canvas-bg p-5">
        <slot />
      </div>
      <AppFooter />
    </div>
  </div>
</template>
