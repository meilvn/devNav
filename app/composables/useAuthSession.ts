export function useAuthSession() {
  const auth: any = useAuth();
  return auth.useSession();
}