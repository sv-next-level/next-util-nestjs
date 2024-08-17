import { defineConfig } from "drizzle-kit";

import { ConfigService } from "@nestjs/config";

import {
  POSTGRES_DB_CONNECTION,
  POSTGRES_DB_SCHEMA_PATH,
} from "@/db/connection";

const configService = new ConfigService();

export default defineConfig({
  dialect: "postgresql",
  schema: POSTGRES_DB_SCHEMA_PATH,
  out: "./src/db/postgres/drizzle/migrations",
  dbCredentials: {
    url: configService.get<string>(
      `${POSTGRES_DB_CONNECTION.MAIN}_POSTGRES_URI`,
    ),
  },
});
