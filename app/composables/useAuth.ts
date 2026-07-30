// composables/useAuth.ts
export function useAuth() {
  const { $auth } = useNuxtApp();
  return $auth;
}
