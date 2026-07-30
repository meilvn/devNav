import { createAuthClient } from 'better-auth/vue';

export default defineNuxtPlugin(({ $fetch }) => {
  const authClient = createAuthClient({
    baseURL: process.env.NUXT_PUBLIC_BETTER_AUTH_URL!,
  });
  return {
    provide: {  // 注入全局变量$auth,方便后续composables（useAuth）使用
      auth: authClient,
    },
  };
});
