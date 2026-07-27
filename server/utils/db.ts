import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '../db/schema';

// 使用 file: 协议读取本地 SQLite 文件
const client = createClient({
  url: `file:${process.env.DB_FILE_NAME}`,
});

export const db = drizzle(client, { schema });