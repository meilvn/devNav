import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { friendLinks, friendLinkStatus } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
    const publishedFriendLinks = await db.select().from(friendLinks).where(eq(friendLinks.status, friendLinkStatus.PUBLISHED));
    return publishedFriendLinks;
})