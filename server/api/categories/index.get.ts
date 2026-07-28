import { db } from '~~/server/utils/db';
import { categories } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
    const allCategories = await db.select().from(categories);
    return allCategories;
})