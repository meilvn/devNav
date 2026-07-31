// 这是数据库连接工具，负责创建数据库连接
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '../db/schema';
import "dotenv/config";

// 使用 file: 协议读取本地 SQLite 文件
const dbPath = process.env.DB_FILE_NAME!;
const url = dbPath.startsWith("file:") ? dbPath : `file:${dbPath}`;

const client = createClient({
  url
});

export const db = drizzle(client, { schema });