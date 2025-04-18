import { pgTable, serial, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

// Sunnahs table - stores all the available Sunnahs
export const sunnahs = pgTable('sunnahs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  explanation: text('explanation').notNull(),
  examples: text('examples').notNull(),
  type: text('type').notNull(), // 'verbal' or 'practical'
  source: text('source').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

// User completions table - tracks when users complete a Sunnah
export const completions = pgTable('completions', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  sunnahId: serial('sunnah_id').notNull(),
  notes: text('notes'),
  shared: boolean('shared').default(false),
  completedAt: timestamp('completed_at').defaultNow()
});

// Daily Sunnah tracking - which Sunnah is shown on which day
export const dailySunnahs = pgTable('daily_sunnahs', {
  id: serial('id').primaryKey(),
  sunnahId: serial('sunnah_id').notNull(),
  date: timestamp('date').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});