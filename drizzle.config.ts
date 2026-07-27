// 这是Drizzle-Kit的配置文件，负责定义数据库迁移和种子文件的路径
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './server/db/schema.ts',
    out: './drizzle',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DB_FILE_NAME!,
    },
})