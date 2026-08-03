import { db } from "~~/server/utils/db";
import { navigations } from "~~/server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const url = event.path;
    const query = new URLSearchParams(url.split('?')[1]);
    const page = Number(query.get('page') || 1);
    const pageSize = Number(query.get('pageSize') || 10);
    const status = Number(query.get('status'));
    let data = [];
    let total = 0;
    if(status){
        data = await db.select().from(navigations).where(eq(navigations.status, status)).limit(pageSize).offset((page - 1) * pageSize);
        total = await db.$count(navigations, eq(navigations.status, status));
    } else {
        data = await db.select().from(navigations).limit(pageSize).offset((page - 1) * pageSize);
        total = await db.$count(navigations);
    }
    return {
        data,
        total,
    }
});
