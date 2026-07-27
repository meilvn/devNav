// 这是数据库表结构定义文件，负责定义数据库中的表结构
import {sqliteTable, integer, text} from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    sort: integer('sort').default(0),
    icon: text('icon').notNull(),
})