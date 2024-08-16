import { registerAs } from "@nestjs/config";

import { MONGOOSE_DB_CONNECTION } from "@/db/connection";

export const MONGOOSE_DB_CONFIG = Object.values(MONGOOSE_DB_CONNECTION).map(
  (connectionName: string) => {
    return registerAs(connectionName, () => {
      return {
        MONGO_URI: process.env[`${connectionName}_MONGO_URI`],
        MONGO_DATABASE_NAME:
          process.env[`${connectionName}_MONGO_DATABASE_NAME`],
        MONGO_CONFIG: process.env[`${connectionName}_MONGO_CONFIG`],

        get dbUri() {
          return `${this.MONGO_URI}/${this.MONGO_DATABASE_NAME}?${this.MONGO_CONFIG}`;
        },
      };
    });
  },
);
