import { db } from "~~/server/utils/db";
import { auth } from "~~/server/auth";
import { createInsertSchema } from "drizzle-zod";
import { navigations, navigationStatus } from "~~/server/db/schema";

const InsertNavigationSchema = createInsertSchema(navigations).omit({
  id: true
});

export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    return createError({
      statusCode: 405,
      message: "Method Not Allowed",
    });
  }
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  if (!session) {
    throw createError({
      statusCode: 401,
      message: "未登录",
    });
  }
  const userId = session.user.id;
  console.log(userId);
  const validatedData = await readValidatedBody(event, (body: any) => {
    // 补全status和submitter字段
    body.status = navigationStatus.PENDING;
    body.submitter = userId;
    const result = InsertNavigationSchema.safeParse(body);
    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: "请求数据校验失败",
      });
    }
    return result.data;
  });

  // 校验通过后 validatedData 就是安全的类型
  // 这里可以插入数据库、
  try {
    const newNav = await db.insert(navigations).values(validatedData).returning();
    return { success: true, data: newNav[0] };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "数据库操作异常",
    });
  }
});
