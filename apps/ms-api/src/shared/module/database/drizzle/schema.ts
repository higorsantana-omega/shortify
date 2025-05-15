import { bigint, char, datetime, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'

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

export const linkAccessLogs = mysqlTable('link_access_logs', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement().notNull(),
  shortlinkKey: varchar('shortlink_key', { length: 10 }).notNull(),
  accessedAt: datetime('accessed_at').notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
})
