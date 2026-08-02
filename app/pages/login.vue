<template>
  <div class="min-h-screen flex bg-canvas-bg">
    <aside
      class="hidden lg:flex w-[600px] flex-col text-white bg-gradient-to-b from-primary to-[#3730A3] p-14"
    >
      <!-- logo -->
      <div class="flex items-center gap-3">
        <div
          class="h-9 w-9 rounded-lg bg-white/15 grid place-items-center font-bold"
        >
          D
        </div>
        <div class="font-bold text-xl">DevNav</div>
      </div>
      <div class="mt-10">
        <h1 class="font-bold text-[40px]">为开发者打造<br />专属资源中心</h1>
        <h3 class="text-regular text-base mt-4">
          发现、收藏、管理你最爱的开发工具、框架与文档<br />——— 一处搞定
        </h3>
        <ul class="mt-8 space-y-3 text-[15px]">
          <li>✓ 聚合全网优质开发资源</li>
          <li>✓ 个人书签私密收藏</li>
          <li>✓ 一键提交，社区共建</li>
        </ul>
      </div>
      <!-- 装饰代码卡 -->
      <div class="rounded-xl bg-white/10 p-4 font-mono text-xs mt-10 w-[70%]">
        <div class="flex items-center gap-2">
          <div class="h-3 w-3 rounded-full bg-success"></div>
          <div class="h-3 w-3 rounded-full bg-warning"></div>
          <div class="h-3 w-3 rounded-full bg-error"></div>
        </div>
        <div class="flex flex-col gap-3 mt-4">
          <div class="bg-white/90 w-[60%] h-2 rounded-xl"></div>
          <div class="bg-white/70 w-[40%] h-2 rounded-xl"></div>
          <div class="bg-success w-[50%] h-2 rounded-xl"></div>
          <div class="bg-white/50 w-[30%] h-2 rounded-xl"></div>
        </div>
        <pre class="mt-2" />
      </div>
    </aside>
    <main class="flex-1 flex justify-center items-center">
      <UCard class="w-[400px] rounded-2xl bg-white">
        <template #header>
          <div>
            <h2 class="text-2xl font-bold text-ink-primary">欢迎回来</h2>
            <p class="text-ink-secondary text-sm mt-1">
              登陆你的 DevNav 账号，继续你的开发之旅
            </p>
          </div>
        </template>
        <UForm :schema="schema":state="state" class="space-y-5" @submit="onSubmit">
          <UFormField label="邮箱地址" name="email">
            <UInput
              v-model="state.email"
              placeholder="you@example.com"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <UFormField label="密码" name="password">
            <PasswordInput v-model="state.password" placeholder="••••••••" />
          </UFormField>

          <div class="flex justify-between items-center">
            <UCheckbox size="md" label="记住我" v-model="state.remember" />
            <UButton
              size="md"
              color="primary"
              variant="link"
              @click="navigateTo('/resetPwd')"
              >忘记密码？
            </UButton>
          </div>
          <div class="flex justify-between">
            <UButton
              block
              size="xl"
              color="primary"
              :loading="isLoading"
              type="submit"
              >登录
            </UButton>
          </div>
          <USeparator label="或" />
          <div class="flex items-center justify-center">
            <span class="text-ink-secondary text-sm">还没有账号？</span>
            <UButton
              size="lg"
              type="button"
              variant="link"
              class="p-0 font-bold"
              @click="navigateTo('/register')"
              >立即注册</UButton
            >
          </div>
        </UForm>
      </UCard>
    </main>
  </div>
</template>
<script lang="ts" setup>
import * as z from 'zod'

definePageMeta({
  layout: false,
});

const auth: any = useAuth();
const { showErrorToast } = useToastExtras();
const schema = z.object({
  email: z.email('请输入有效的邮箱地址'),
  password: z.string().refine(val => val.length > 0, '请输入密码').min(8, '密码长度不能少于8位')
})

const state = reactive({
  email: "",
  password: "",
  remember: false,
});
const isLoading = ref(false);

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const { error } = await auth.signIn.email({
      email: state.email,
      password: state.password,
      rememberMe: state.remember,
    });
    isLoading.value = false;
    if (error) {
      showErrorToast("登录失败", "请检查邮箱和密码是否正确");
    } else {
      const session = await auth.getSession();
      const user = session.data?.user;
      if (user?.role === 'admin') {
        navigateTo("/admin");
      } else {
        navigateTo("/");
      }
    }
  } catch (err: any) {
    isLoading.value = false;
    showErrorToast("登录失败", "网络异常，请稍后重试");
  }
};
</script>
