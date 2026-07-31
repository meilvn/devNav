import { createAuthClient } from 'better-auth/vue';
import { emailOTPClient } from "better-auth/client/plugins"

export default defineNuxtPlugin((nuxtApp) => {
  const authClient = createAuthClient({
    baseURL: process.env.NUXT_PUBLIC_BETTER_AUTH_URL!,
    plugins: [emailOTPClient()],
  });
  return {
    provide: {  // 注入全局变量$auth,方便后续composables（useAuth）使用
      auth: authClient,
    },
  };
});
