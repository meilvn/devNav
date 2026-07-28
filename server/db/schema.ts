// 这是数据库表结构定义文件，负责定义数据库中的表结构
import { sqliteTable, integer, text, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  sort: integer("sort").default(0),
  icon: text("icon").notNull(),
});

export const navigationStatus = {
  PENDING: 0,
  PUBLISHED: 1,
  REJECTED: 2,
};
export type NavigationStatus =
  (typeof navigationStatus)[keyof typeof navigationStatus];
export const navigations = sqliteTable("navigations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category_id: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").default(""),
  tags: text("tags").default("[]"),
  url: text("url").notNull(),
  status: integer("status").default(navigationStatus.PENDING),
  submitter: text("submitter").notNull(),
}, (table) => [check("status_status", sql`${table.status} IN (0, 1, 2)`)]);

export const friendLinkStatus = {
  PENDING: 0,
  PUBLISHED: 1,
};
export type FriendLinkStatus =
  (typeof friendLinkStatus)[keyof typeof friendLinkStatus];
export const friendLinks = sqliteTable(
  "friend_links",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    url: text("url").notNull(),
    status: integer("status").default(friendLinkStatus.PENDING),
  },
  (table) => [check("status_status", sql`${table.status} IN (0, 1)`)],
);
