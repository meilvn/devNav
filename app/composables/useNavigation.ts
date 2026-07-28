import { debounce } from '~/utils/common';

export const useNavigation = () => {

  const currentCategory = useState("navigation-current-category", () => "");
  const loading = ref(false);
  const searchKeyword = ref("");

  const { data: navigationList } = useAsyncData(
    "navigation-list",
    async () => {
      const query: any = {};
      currentCategory.value && (query.category = currentCategory.value);
      searchKeyword.value && (query.keyword = searchKeyword.value);

      return await $fetch("/api/navigations", {
        params: query,
      });
    },
    {
      server: true,
      dedupe: "defer",
      watch: [currentCategory, searchKeyword],
    },
  );

  const search = debounce((keyword: string)=>{
    searchKeyword.value = keyword;
  }, 500);

  const switchCategory = (category: string) => {
    currentCategory.value = category;
  };

  return {
    navigationList,
    loading,
    searchKeyword,
    search,
    switchCategory,
  }
};
