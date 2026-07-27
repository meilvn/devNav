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
  await seed(db as any, {friendLinks: schema.friendLinks}, {count: 4});
}

main();
