export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = useAuthSession();
  // 已登录用户访问登录/注册页时重定向
  if ((to.path === "/login" || to.path === "/register") && session?.value) {
    return from.path !== "/" ? from.path : "/";
  }
});
