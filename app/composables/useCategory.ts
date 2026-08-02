export const useCategory = () => {
  const { data: categories = [] } = useFetch("/api/categories", {
    key: "categories",
    default: () => [],
  });
  return categories;
};