import { db } from "~~/server/utils/db";
import { eq } from "drizzle-orm";
import { navigations, navigationStatus } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  // 筛选出status为published的导航项
  const query = getRequestURL(event);
  const keyword = query.searchParams.get('keyword')?.toLowerCase() || '';
  const categoryId = query.searchParams.get('category')?.toLowerCase() || '';
  const publishedNavigations = await db.select().from(navigations).where(
    eq(navigations.status, navigationStatus.PUBLISHED)
  );
  const isKeywordMatched = keyword ? (item: any) => item.title.toLowerCase().includes(keyword) 
  || item.description.toLowerCase().includes(keyword) || item.tags?.split(',').includes(keyword)
   : () => true;
  const isCategoryMatched = categoryId ? (item: any) => item.category_id === Number(categoryId)
   : () => true;
  
  return publishedNavigations.filter(isKeywordMatched).filter(isCategoryMatched).map((item) => ({
    ...item,
    tags: item.tags?.split(',') || [],
  }));
});
