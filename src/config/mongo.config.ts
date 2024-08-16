import { registerAs } from "@nestjs/config";

import { MONGO_DB_CONNECTION } from "@/db/connection";

export const MONGO_DB_CONFIG = Object.values(MONGO_DB_CONNECTION).map(
  (connectionName: string) => {
    return registerAs(connectionName, () => {
      return {
        MONGO_URI: process.env[`${connectionName}_MONGO_URI`],

        get dbUri() {
          return `${this.MONGO_URI}`;
        },
      };
    });
  },
);
