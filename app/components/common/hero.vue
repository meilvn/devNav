<template>
    <div class="bg-transparent px-8 pt-14 pb-12">
        <h1 class="text-4xl font-bold text-center text-ink-primary mb-4">
            发现并收藏最好的开发者资源
        </h1>
        <p class="text-md text-center text-ink-secondary mb-8">
            DevNav 聚合优质开发工具与导航，支持个人书签管理，<br>打造你的技术资源中心
        </p>
        <div class="flex justify-center w-full">
            <UInput v-model="searchValue" @update:modelValue="search(searchValue)" @keyup.enter="search(searchValue)" icon="i-lucide-search" size="xl" variant="outline" class="w-[50%]" :ui="{ base: 'rounded-full border-subtle' }"
                placeholder="搜索工具、框架、文档..." type="text">
                <template v-if="searchValue?.length" #trailing>
                    <UButton color="neutral" variant="link" size="sm" icon="i-lucide-x" aria-label="Clear input"
                        @click="searchValue = ''; search(searchValue)" />
                </template>
            </UInput>
        </div>
    </div>
</template>
<script setup lang="ts">

const { search } = useNavigation();
const searchValue = ref("");

</script>
