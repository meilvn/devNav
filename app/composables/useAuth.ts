import type { User } from '~/types/user'

export const useAuth = () => {
  const router = useRouter();
  const user = useState<User>("auth-user", () => ({
    id: "",
    email: "",
    nickname: "",
    role: "user",
  }));
  const isAuthenticated = computed(() => user.value.id !== "");
  const isAdmin = computed(() => user.value.role === "admin");
  const isLoading = ref(false);

  const setUser = (data: User) => {
    user.value = {
      id: data.id || '',
      email: data.email || '',
      nickname: data.nickname || '',
      role: data.role || 'user',
    }
  };

  const clearUser = () => {
    user.value = { id: "", email: "", nickname: "", role: "user" };
  };

  // 从服务器获取用户会话信息，防止因页面刷新导致的登录状态丢失
  const fetchSession = async () => {
    try {
      const response: any = await $fetch("/api/auth/session");
      if (response?.user) {
        setUser(response.user);
      } else {
        clearUser();
      }
    } catch (error) {
      clearUser();
    }
  };

  useAsyncData("session", () => fetchSession(), {
    server: true,
    dedupe: "defer",
  });

  const signIn = async (credentials: { email: string; password: string }) => {
    isLoading.value = true;
    try {
      const response:any = await $fetch("/api/auth/login", {
        method: "POST",
        body: credentials,
      });
      if (response?.user) {
        setUser(response.user);
      } else {
        throw new Error("登录失败");
      }
      return response;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const signUp = async (credentials: {
    email: string;
    password: string;
    nickname: string;
  }) => {
    isLoading.value = true;
    try {
      const response:any = await $fetch("/api/auth/register", {
        method: "POST",
        body: credentials,
      });
      router.replace("/login");
      return response;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const signOut = async () => {
    isLoading.value = true;
    try {
      await $fetch("/api/auth/logout", {
        method: "POST",
      });
      clearUser();
    } catch (error) {
      clearUser();
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const refresh = async () => {
    await fetchSession();
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    refresh,
    signIn,
    signUp,
    signOut,
  };
};
