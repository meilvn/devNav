<template>
    <div class="flex flex-col justify-center items-center h-screen bg-canvas-bg">
        <h1 class="text-3xl font-bold text-center text-ink-primary mb-2">重置密码</h1>
        <p class="text-center text-ink-secondary text-sm mb-5">验证码会发送到你的邮箱</p>
        <UCard class="w-96">
            <UForm :schema="schema" :state="state" @submit.prevent="onResetEmail" class="p-6 space-y-5">
                <UFormField label="邮箱" name="email">
                    <UInput v-if="resetStep === RESET_STEP.EMAIL" v-model="state.email" type="email" placeholder="you@example.com" size="lg" class="w-full" />
                    <div v-else class="flex">
                        <UInput disabled type="text" :defaultValue="state.email" class="flex-1"></UInput>
                        <UButton  variant="link" size="lg" color="primary" @click="resetStep = RESET_STEP.EMAIL">
                            修改
                        </UButton>
                    </div>
                </UFormField>
                <UFormField label="验证码" name="otp" v-if="resetStep === RESET_STEP.OTP">
                    <UPinInput otp :length="6" autofocus v-model="state.otp" size="lg" class="w-full flex justify-between" />
                </UFormField>
                <UButton block size="xl" color="primary" type="submit">下一步
                </UButton>
            </UForm>
        </UCard>
        <!-- 人机验证组件 -->
        <!-- <NuxtTurnstile v-if="showCaptcha" v-model="token" theme="auto"/> -->
    </div>
</template>
<script lang="ts" setup>
import { z } from 'zod'

definePageMeta({
    layout: false,
});

const RESET_STEP = {
    EMAIL: 'email',
    OTP: 'otp',
    RESET: 'reset',
}

const auth = useAuth();
const { showErrorToast, showInfoToast } = useToastExtras();

const state = reactive({
    email: "",
    otp: [],
});
// const token = ref('') // 用于存储 Turnstile 验证码
// const showCaptcha = ref(false)

const resetStep = ref(RESET_STEP.EMAIL);

const schema = z.object({
    email: z.email('请输入有效的邮箱地址'),
})

const onResetEmail = async () => {
    // if (resetStep.value === RESET_STEP.EMAIL){
    //     showCaptcha.value = true;
    // } else {
    //     showCaptcha.value = false;
    // }

    try {
        // const { exists } = await $fetch('/api/check-email', {
        //     method: 'POST',
        //     body: {
        //         email: state.email,
        //     },
        // });
        // if (!exists) {
        //     showWarningToast("当前邮箱未注册", "请先注册账号");
        //     return;
        // } else {
            await sendResetCode(state.email);
            resetStep.value = RESET_STEP.OTP;
        // }
    } catch (error: any) {
        showErrorToast("网络错误", error.message || '');
        return;
    }
}

const sendResetCode = async (email: string) => {
    try {
        await auth.emailOtp.requestPasswordReset({
            email,
        });
        showInfoToast("验证码已发送", "请检查你的邮箱");
    } catch (error: any) {
        showErrorToast("网络错误", error.message || '');
        return;
    }
}
</script>
