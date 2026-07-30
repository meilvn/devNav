// 这是数据库种子文件，负责生成模拟数据用于测试
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { seed } from "drizzle-seed";
import * as schema from "./server/db/schema";
// 加载环境变量
import "dotenv/config";

const dbPath = process.env.DB_FILE_NAME!;
const url = dbPath.startsWith("file:") ? dbPath : `file:${dbPath}`;

const client = createClient({
  url,
});

const db = drizzle(client, { schema });

async function main() {
  // 模拟categories
  await mockCategories();
  // 模拟friendLinks
  await mockFriendLinks();
  // 模拟navigations
  await mockNavigations();
  // 模拟users
  await mockUsers();
}

async function mockCategories() {
  await db.delete(schema.categories);
  await db.insert(schema.categories).values([
    {
      name: "前端",
      sort: 0,
      icon: "icon-default",
    },
    {
      name: "后端",
      sort: 1,
      icon: "icon-default",
    },
    {
      name: "数据库",
      sort: 2,
      icon: "icon-default",
    },
    {
      name: "工具",
      sort: 3,
      icon: "icon-default",
    },
  ]);
  // await seed(db as any, {categories: schema.categories}, {count: 10});
}

async function mockFriendLinks() {
  await db.delete(schema.friendLinks);
  await seed(
    db as any,
    { friendLinks: schema.friendLinks },
    { count: 4 },
  ).refine((funcs) => ({
    friendLinks: {
      columns: {
        status: funcs.valuesFromArray({
          values: [
            schema.friendLinkStatus.PENDING,
            schema.friendLinkStatus.PUBLISHED,
          ],
        }),
      },
    },
  }));
}

const TAG_POOL = [
  "vue",
  "react",
  "angular",
  "svelte",
  "nuxt",
  "node",
  "typescript",
  "javascript",
];
function pickRandomItems(arr, count) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

const TAG_COMBINATIONS = Array.from({ length: 100 }, () => {
  const count = Math.floor(Math.random() * 4) + 1; // 1~4 个标签
  return pickRandomItems(TAG_POOL, count).join(',');
});

async function mockNavigations() {
  await db.delete(schema.navigations);
  const categories = await db
    .select({ id: schema.categories.id })
    .from(schema.categories);
  const categoryIds = categories.map((c) => c.id);
  await seed(
    db as any,
    { navigations: schema.navigations },
    { count: 30 },
  ).refine((funcs) => ({
    navigations: {
      columns: {
        category_id: funcs.valuesFromArray({ values: categoryIds }),
        status: funcs.valuesFromArray({
          values: [
            schema.navigationStatus.PENDING,
            schema.navigationStatus.PUBLISHED,
            schema.navigationStatus.REJECTED,
          ],
        }),
         tags: funcs.valuesFromArray({ values: TAG_COMBINATIONS })
      },
    },
  }));
}

async function mockUsers() {
  await db.delete(schema.users);
  await seed(
    db as any,
    { users: schema.users },
    { count: 5 },
  );
}

main();
