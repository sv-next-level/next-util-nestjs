import { Pool } from "pg";

import { Global, Module } from "@nestjs/common";

import { POSTGRES_DB_CONNECTION } from "@/db/connection";
import {
  ConfigurableDatabaseModule,
  DATABASE_OPTIONS,
  DatabaseOptions,
} from "@/nestjs/db/postgres/drizzle/database.config";
import { DrizzleService } from "@/nestjs/db/postgres/drizzle/drizzle.service";

@Global()
@Module({
  exports: [DrizzleService],
  providers: [
    DrizzleService,
    {
      provide: POSTGRES_DB_CONNECTION.MAIN,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          connectionString: databaseOptions.url,
        });
      },
    },
  ],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
