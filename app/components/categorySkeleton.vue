<template>
    <div class="flex items-center gap-4 border border-subtle p-4 rounded-md h-[164px]">
        <USkeleton class="size-12" />
        <div>
            <USkeleton class="h-8 w-full" />
            <USkeleton class="h-6 w-full" />
            <div class="flex flex-wrap gap-2 mt-2">
                <USkeleton class="h-6 w-[80px]" v-for="tag in 4" color="primary" variant="solid" />
            </div>
        </div>
    </div>
</template>
