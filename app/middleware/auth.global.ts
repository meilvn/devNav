export default defineNuxtRouteMiddleware(async (to, from) => {

  const auth = useAuth();

  const session = await auth.getSession();
  const user: any = session?.data?.user;

  // 已登录用户访问登录/注册页时重定向
  if ((to.path === "/login" || to.path === "/register") && user) {
    return user?.role === "admin" ? "/admin" : "/user";
  }
  if (to.path === "/user/info" && !user) {
    return "/login";
  }
  if (to.path === "/admin" && (!user || user?.role !== "admin")) {
    return "/login";
  }
});
