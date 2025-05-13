import { datetime, mysqlTable, serial, text, varchar } from 'drizzle-orm/mysql-core'

export const links = mysqlTable('links', {
  id: serial('id').primaryKey(),
  key: varchar({ length: 10 }).notNull().unique(),
  url: text().notNull(),
  expired_url: text().notNull(),
  domain: varchar({ length: 100 }).notNull(),
  expires_at: datetime(),
  created_at: datetime(),
  updated_at: datetime(),
})
