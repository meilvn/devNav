<template>
    <div class="flex flex-col justify-center items-center h-screen bg-canvas-bg">
        <h1 class="text-3xl font-bold text-center text-ink-primary mb-2">注册</h1>
        <p class="text-center text-ink-secondary text-sm mb-5">创建你的 DevNav 账号，开始你的开发之旅</p>
        <UCard class="w-96">
            <UForm :schema="schema" :state="state" @submit.prevent="onRegister" class="p-6 space-y-5">
                <UFormField label="昵称" name="nickname">
                    <UInput v-model="state.nickname" type="text" placeholder="请输入昵称" size="lg" class="w-full" />
                </UFormField>
                <UFormField label="邮箱" name="email">
                    <UInput v-model="state.email" type="email" placeholder="you@example.com" size="lg" class="w-full" />
                </UFormField>
                <UFormField label="密码" name="password">
                    <UInput v-model="state.password" type="password" placeholder="••••••••" size="lg" class="w-full" />
                </UFormField>
                <UButton block size="xl" color="primary" type="submit">注册
                </UButton>
            </UForm>
        </UCard>
    </div>
</template>
<script lang="ts" setup>
import { z } from 'zod'

definePageMeta({
    layout: false,
});
const auth = useAuth();
const { showErrorToast } = useToastExtras();
const state = reactive({
    email: "",
    password: "",
    nickname: "",
});

const schema = z.object({
    email: z.email('请输入有效的邮箱地址'),
    password: z.string().refine(val => val.length > 0, '请输入密码').min(8, '密码长度不能少于8位'),
    nickname: z.string().refine(val => val.length > 0, '请输入昵称'),
})

const onRegister = async () => {
    const { error } = await auth.signUp.email({
        email: state.email,
        password: state.password,
        name: state.nickname,
    });
    if (error) {
        showErrorToast("注册失败", error.message || '');
    } else {
        navigateTo("/");
    }
};
</script>
