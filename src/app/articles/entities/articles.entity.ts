import { pgTable, serial, text } from "drizzle-orm/pg-core";

const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export { articles };
