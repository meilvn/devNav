import { categories } from '#server/db/schema';
import { db } from '#server/utils/db';

export default defineEventHandler(async (event) => {
    const allCategories = await db.select().from(categories);
    return allCategories;
})