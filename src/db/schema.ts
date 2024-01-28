import { sql } from 'drizzle-orm'
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const Leaderboard = sqliteTable('leaderboard', {
  id: integer('id').notNull().primaryKey(),
  username: text('username').notNull(),
  wpm: integer('wpm').notNull(),
  date: text('date').default(sql`CURRENT_DATE`),
})

export const User = sqliteTable('user', {
  userId: text('uid').notNull().primaryKey(),
  testsStarted: integer('tests_started'),
  testsCompleted: integer('tests_completed'),
  topWPM: integer('top_wpm'),
  avgWPM: integer('avg_wpm'),
  avgAccuracy: integer('avg_accuracy'),
})
