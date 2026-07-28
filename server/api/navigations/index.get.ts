import { db } from "~~/server/utils/db";
import { eq } from "drizzle-orm";
import { navigations, navigationStatus } from "~~/server/db/schema";

export default defineEventHandler(async (event) => {
  // 筛选出status为published的导航项
  const publishedNavigations = await db.select().from(navigations).where(
    eq(navigations.status, navigationStatus.PUBLISHED)
  );
  return publishedNavigations.map((item) => ({
    ...item,
    tags: item.tags?.split(',') || [],
  }));
});
