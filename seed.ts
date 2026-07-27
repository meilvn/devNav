// 这是数据库种子文件，负责生成模拟数据用于测试
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { seed } from 'drizzle-seed';
import * as schema from "./server/db/schema";
// 加载环境变量
import 'dotenv/config';

const dbPath = process.env.DB_FILE_NAME!;
const url = dbPath.startsWith('file:') ? dbPath : `file:${dbPath}`;

const client = createClient({
  url,
});


const db = drizzle(client, { schema });

async function main() {

    // 清空所有分类
    await db.delete(schema.categories);
    await seed(db as any, {categories: schema.categories}, {count: 10});
}

main();
