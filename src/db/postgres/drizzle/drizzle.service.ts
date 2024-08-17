import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { Inject, Injectable } from "@nestjs/common";

import { POSTGRES_DB_CONNECTION, POSTGRES_DB_SCHEMA } from "@/db/connection";

@Injectable()
export class DrizzleService {
  public db: NodePgDatabase<typeof POSTGRES_DB_SCHEMA>;
  constructor(
    @Inject(POSTGRES_DB_CONNECTION.MAIN) private readonly pool: Pool,
  ) {
    this.db = drizzle(this.pool, { schema: POSTGRES_DB_SCHEMA });
  }
}
