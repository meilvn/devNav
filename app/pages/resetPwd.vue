<template>
  <NuxtLayout name="auth">
    <template #header>
      <h1 class="text-3xl font-bold text-center text-ink-primary mb-2">
        重置密码
      </h1>
      <p class="text-center text-ink-secondary text-sm mb-5">
        验证码会发送到你的邮箱
      </p>
    </template>
    <UForm
      :schema="schema"
      :state="state"
      @submit.prevent="onNext"
      class="p-6 space-y-5"
    >
      <UFormField
        v-if="resetStep !== RESET_STEP.RESET"
        label="邮箱"
        name="email"
      >
        <UInput
          v-if="resetStep === RESET_STEP.EMAIL"
          v-model="state.email"
          type="email"
          placeholder="you@example.com"
          size="lg"
          class="w-full"
        />
        <div v-else-if="resetStep === RESET_STEP.OTP" class="flex">
          <UInput
            disabled
            type="text"
            :defaultValue="state.email"
            class="flex-1"
          ></UInput>
          <UButton
            variant="link"
            size="lg"
            color="primary"
            @click="resetStep = RESET_STEP.EMAIL"
          >
            修改
          </UButton>
        </div>
      </UFormField>
      <UFormField label="验证码" name="otp" v-if="resetStep === RESET_STEP.OTP">
        <UPinInput
          otp
          :length="6"
          autofocus
          v-model="state.otp"
          size="lg"
          class="w-full flex justify-between"
        />
      </UFormField>
      <UFormField
        label="新密码"
        name="newPassword"
        v-if="resetStep === RESET_STEP.RESET"
      >
        <passwordInput v-model="state.newPassword" />
      </UFormField>
      <UFormField
        label="确认新密码"
        name="confirmPassword"
        v-if="resetStep === RESET_STEP.RESET"
      >
        <passwordInput v-model="state.confirmPassword" />
      </UFormField>
      <UButton
        :loading="isLoading"
        block
        size="xl"
        color="primary"
        type="submit"
      >
        {{ resetStep === RESET_STEP.RESET ? "确认" : "下一步" }}
      </UButton>
    </UForm>
    <!-- 人机验证组件 -->
    <!-- <NuxtTurnstile v-if="showCaptcha" v-model="token" theme="auto"/> -->
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { z } from "zod";

definePageMeta({
  layout: false,
});

const RESET_STEP = {
  EMAIL: "email",
  OTP: "otp",
  RESET: "reset",
};

const auth = useAuth();
const { showErrorToast, showInfoToast, showWarningToast } = useToastExtras();

const state = reactive({
  email: "",
  otp: [],
  newPassword: "",
  confirmPassword: "",
});
// const token = ref('') // 用于存储 Turnstile 验证码
// const showCaptcha = ref(false)

const resetStep = ref(RESET_STEP.EMAIL);
const isLoading = ref(false);

const schema = computed(() => {
  const email = z.email("请输入有效的邮箱地址");
  if (resetStep.value === RESET_STEP.EMAIL) {
    return z.object({ email });
  }
  if (resetStep.value === RESET_STEP.OTP) {
    return z.object({
      email,
      otp: z
        .array(z.string().min(1, "请输入验证码"))
        .length(6, "请输入完整的6位验证码"),
    });
  }
  // RESET_STEP.RESET
  return z
    .object({
      email,
      newPassword: z.string().min(6, "请输入6位以上密码"),
      confirmPassword: z.string().min(6, "请输入6位以上密码"),
    })
    .refine((data) => data.confirmPassword === data.newPassword, {
      message: "两次输入密码不一致",
      path: ["confirmPassword"],
    });
});

const onNext = async () => {
  // if (resetStep.value === RESET_STEP.EMAIL){
  //     showCaptcha.value = true;
  // } else {
  //     showCaptcha.value = false;
  // }
  if (resetStep.value === RESET_STEP.EMAIL) {
    await onSendResetode();
  } else if (resetStep.value === RESET_STEP.OTP) {
    await onCheckResetCode();
  } else if (resetStep.value === RESET_STEP.RESET) {
    await onResetPassword();
  }
};

const onSendResetode = async () => {
  try {
    isLoading.value = true;
    const { exists } = await $fetch("/api/check-email", {
      method: "POST",
      body: {
        email: state.email,
      },
    });
    if (!exists) {
      showWarningToast("当前邮箱未注册", "请先注册账号");
    } else {
      await sendResetCode(state.email);
      resetStep.value = RESET_STEP.OTP;
    }
  } catch (error: any) {
    showErrorToast("网络错误", error.message || "");
  } finally {
    isLoading.value = false;
  }
};

const sendResetCode = async (email: string) => {
  try {
    const { error } = await auth.emailOtp.requestPasswordReset({
      email,
    });
    if (error) {
      showErrorToast("网络错误", error.message || "");
      return;
    }
    showInfoToast("验证码已发送", "请检查你的邮箱");
  } catch (err: any) {
    showErrorToast("网络错误", err.message || "");
  }
};

const onCheckResetCode = async () => {
  try {
    isLoading.value = true;
    const { error } = await auth.emailOtp.checkVerificationOtp({
      type: "forget-password",
      email: state.email,
      otp: state.otp.join(""),
    });
    if (error) {
      showErrorToast("校验失败", error.message || "");
      return;
    }
    resetStep.value = RESET_STEP.RESET;
    showInfoToast("验证码正确", "请设置新密码");
  } catch (err: any) {
    showErrorToast("网络错误", err.message || "");
  } finally {
    isLoading.value = false;
  }
};

const onResetPassword = async () => {
  try {
    isLoading.value = true;
    const { error } = await auth.emailOtp.resetPassword({
      email: state.email,
      otp: state.otp.join(""),
      password: state.newPassword,
    });
    if (error) {
      showErrorToast("密码重置失败", error.message || "");
      return;
    }
    showInfoToast("密码重置成功", "请重新登录");
    navigateTo("/login");
  } catch (err: any) {
    showErrorToast("网络错误", err.message || "");
  } finally {
    isLoading.value = false;
  }
};
</script>
