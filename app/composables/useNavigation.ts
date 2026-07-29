import { debounce } from '~/utils/common';

export const useNavigation = () => {

  const currentCategoryId = useState("navigation-current-category");
  const searchKeyword = ref('');

  const { data: navigationList, refresh, pending } = useAsyncData(
    "navigation-list",
    async () => {
      const query: any = {};
      currentCategoryId.value && (query.category = currentCategoryId.value);
      searchKeyword.value && (query.keyword = searchKeyword.value);

      return await $fetch("/api/navigations", {
        params: query,
      });
    },
    {
      server: true,    // 控制是否由服务端来调用接口，设置为false时，该接口由客户端调用
      lazy: true,   // 控制页面路由跳转时，是否需要等待该接口返回再渲染，对于不重要的接口可以设置为true
      watch: [currentCategoryId, searchKeyword],  // 监听currentCategoryId和searchKeyword变化
      dedupe: 'defer',
    },
  );

  // 手动发起请求,一般用于按钮点击后的接口调用,比较难处理重复请求问题
  // const fetchData = async () => {
  //   loading.value = true
  //   try {
  //     const query: any = {}
  //     if (currentCategoryId.value) query.category = currentCategoryId.value
  //     if (searchKeyword.value) query.keyword = searchKeyword.value

  //     const data = await $fetch('/api/navigations', { params: query })
  //     navigationList.value = data
  //     return data
  //   } catch (error) {
  //     console.error('获取导航列表失败:', error)
  //     navigationList.value = []
  //     throw error
  //   } finally {
  //     loading.value = false
  //   }
  // }

  const search = debounce((keyword: string)=>{
    searchKeyword.value = keyword;
    // fetchData()
  }, 500);

  const switchCategory = (categoryId?: number) => {
    currentCategoryId.value = categoryId || '';
    // fetchData()
  };

  return {
    navigationList,
    pending,
    searchKeyword,
    search,
    switchCategory,
    refresh,
  }
};
