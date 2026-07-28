<template>
    <UCard :ui="{ body: 'p-4 bg-white', root: 'border-subtle hover:shadow-lg transition-all duration-300 cursor-pointer' }" @click="handleClick">
        <div class="flex justify-between mb-2">
            <UIcon name="i-material-symbols:pentagon-outline-rounded" class="w-8 h-8 rounded-md" />
            <UButton size="lg" :active="true" icon="material-symbols:bookmark-add-outline-sharp" color="neutral"
                activeColor="primary" variant="outline" activeVariant="solid"
                class="font-bold rounded-lg cursor-pointer">
            </UButton>
        </div>
        <div>
            <p class="text-ink-primary font-bold text-base">{{ category.title }}</p>
            <p class="text-muted text-sm">{{ category.description }}</p>
            <p class="text-primary text-sm mt-2">{{ category.tags.join(' ') }}</p>
        </div>
    </UCard>
</template>
<script setup lang="ts">
const props = defineProps({
    category: {
        type: Object,
        default: () => ({}),
    },
})

const handleClick = () => {
    window.open(props.category.url, '_blank')
}
</script>
