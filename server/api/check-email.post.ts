import { db } from '../utils/db'
import { user } from '../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event);
    const isEmailRegistered = await db.select().from(user).where(eq(user.email, email)).limit(1);
    return { exists: isEmailRegistered.length > 0 };
})