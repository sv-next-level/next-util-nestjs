import { pgTable, serial, text } from "drizzle-orm/pg-core";

const Article = pgTable("articles", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export { Article };
