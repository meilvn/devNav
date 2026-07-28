<template>
    <UCard :ui="{ body: 'p-4 bg-white', root: 'border-subtle hover:shadow-lg transition-all duration-300 cursor-pointer' }" @click="handleClick">
        <div class="flex justify-between mb-2">
            <UIcon name="i-material-symbols:pentagon-outline-rounded" class="w-8 h-8 rounded-md" />
            <UButton size="lg" :active="false" icon="material-symbols:bookmark-add-outline-sharp" color="neutral"
                activeColor="primary" variant="outline" activeVariant="solid"
                class="font-bold rounded-lg cursor-pointer" @click="handleBookmarkClick">
            </UButton>
        </div>
        <div>
            <p class="text-ink-primary font-bold text-base">{{ category.title }}</p>
            <p class="text-muted text-sm">{{ category.description }}</p>
            <div class="flex flex-wrap gap-2 mt-2">
                <UKbd v-for="tag in category.tags" :key="tag" color="primary" variant="solid">{{ tag }}</UKbd>
            </div>
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

const handleBookmarkClick = (event:MouseEvent) => {
    event.stopPropagation()
}

const handleClick = () => {
    window.open(props.category.url, '_blank')
}
</script>
