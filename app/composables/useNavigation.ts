import { debounce } from '~/utils/common';

export const useNavigation = () => {

  const currentCategoryId = useState("navigation-current-category");
  const loading = ref(false);
  const searchKeyword = ref('');
  const navigationList = useState<any[]>('nav-data-list', () => [])


  // 这里原本采用useAsyncData和watch去实现 预取+ 监听变化，
  // 但因为useNavigation被多个组件使用，会生成多个实例，一旦watch监听变化，多个实例都会触发重复的接口调用，所以改为手动
  // const { data: navigationList } = useAsyncData(
  //   "navigation-list",
  //   async () => {
  //     const query: any = {};
  //     currentCategoryId.value && (query.category = currentCategoryId.value);
  //     searchKeyword.value && (query.keyword = searchKeyword.value);

  //     return await $fetch("/api/navigations", {
  //       params: query,
  //     });
  //   },
  //   {
  //     server: true,
  //     watch: [currentCategoryId, searchKeyword],
  //     dedupe: 'defer',
  //   },
  // );

  const fetchData = async () => {
    loading.value = true
    try {
      const query: any = {}
      if (currentCategoryId.value) query.category = currentCategoryId.value
      if (searchKeyword.value) query.keyword = searchKeyword.value

      const data = await $fetch('/api/navigations', { params: query })
      navigationList.value = data
      return data
    } catch (error) {
      console.error('获取导航列表失败:', error)
      navigationList.value = []
      throw error
    } finally {
      loading.value = false
    }
  }

  // 服务器端获取导航列表
  if(process.server){
    fetchData()
  }

  const search = debounce((keyword: string)=>{
    searchKeyword.value = keyword;
    fetchData()
  }, 300);

  const switchCategory = (categoryId?: number) => {
    currentCategoryId.value = categoryId || '';
    fetchData()
  };

  return {
    navigationList,
    loading,
    searchKeyword,
    search,
    switchCategory,
  }
};
