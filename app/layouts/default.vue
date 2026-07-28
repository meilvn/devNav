<template>
    <div class="flex flex-col h-screen">
        <AppHeader />
        <div class="flex-1 bg-canvas-bg p-5 overflow-auto">
            <Hero />
            <slot />
        </div>
        <AppFooter />
    </div>
</template>

