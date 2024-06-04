import { registerAs } from "@nestjs/config";
import { MONGOOSE_DB_CONNECTION } from "@/db/connection";

export const MONGOOSE_DB_CONFIG = Object.values(MONGOOSE_DB_CONNECTION).map(
  (connectionName: string) => {
    return registerAs(connectionName, () => {
      return {
        MONGODB_URI: process.env[`${connectionName}_MONGODB_URI`],
        DATABASE_NAME: process.env[`${connectionName}_DATABASE_NAME`],
        MONGODB_CONFIG: process.env[`${connectionName}_MONGODB_CONFIG`],

        get dbUri() {
          return `${this.MONGODB_URI}/${this.DATABASE_NAME}?${this.MONGODB_CONFIG}`;
        },
      };
    });
  }
);
