import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todosTable = sqliteTable('todos', {
  id: integer('id').primaryKey(),
  content: text('content').notNull(),
  completed: integer('completed', { mode: 'boolean' }),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

export type Inserttodo = typeof todosTable.$inferInsert;
export type Selecttodo = typeof todosTable.$inferSelect;
