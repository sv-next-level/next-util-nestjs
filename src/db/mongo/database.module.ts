import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { MONGOOSE_DB_CONNECTION } from "@/db/connection";
import { createMongooseConfigServiceClass } from "./mongoose-config.service";

@Module({
  imports: [
    ...Object.values(MONGOOSE_DB_CONNECTION).map((connectionName: string) => {
      return MongooseModule.forRootAsync({
        connectionName: connectionName,
        useClass: createMongooseConfigServiceClass(connectionName),
      });
    }),
  ],

  exports: [MongooseModule],
  providers: [MongooseModule],
})
export class MongooseDatabaseModule {}
