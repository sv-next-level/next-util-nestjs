import { registerAs } from "@nestjs/config";

import { POSTGRES_DB_CONNECTION } from "@/db/connection";

export const POSTGRES_DB_CONFIG = Object.values(POSTGRES_DB_CONNECTION).map(
  (connectionName: string) => {
    return registerAs(connectionName, () => {
      return {
        POSTGRES_URI: process.env[`${connectionName}_POSTGRES_URI`],

        get dbUri() {
          return `${this.POSTGRES_URI}`;
        },
      };
    });
  },
);
