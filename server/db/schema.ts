// 这是数据库表结构定义文件，负责定义数据库中的表结构
import {sqliteTable, integer, text} from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    sort: integer('sort').default(0),
    icon: text('icon').notNull(),
})

export const friendLinkStatus = {
    PENDING: 0,
    PUBLISHED: 1,
}
export type FriendLinkStatus = (typeof friendLinkStatus)[keyof typeof friendLinkStatus]
export const friendLinks = sqliteTable('friend_links', {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    url: text('url').notNull(),
    status: integer('status').default(friendLinkStatus.PENDING),
})

