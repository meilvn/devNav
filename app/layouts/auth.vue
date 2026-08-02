<template>
    <div class="flex flex-col justify-center items-center h-screen bg-canvas-bg">
        <slot name="header"></slot>
        <UCard class="w-96">
            <slot></slot>
        </UCard>
    </div>
</template>

