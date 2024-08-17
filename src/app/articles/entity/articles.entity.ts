import { pgTable, serial, text } from "drizzle-orm/pg-core";

const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title"),
  content: text("content"),
});

export { articles };
