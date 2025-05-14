import { char, datetime, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'

export const links = mysqlTable('links', {
  id: char('id', { length: 36 }).primaryKey().notNull(),
  key: varchar({ length: 10 }).notNull().unique(),
  url: text().notNull(),
  shortLink: text().notNull(),
  expired_url: text().notNull(),
  domain: varchar({ length: 100 }).notNull(),
  expires_at: datetime(),
  created_at: datetime(),
  updated_at: datetime(),
})
