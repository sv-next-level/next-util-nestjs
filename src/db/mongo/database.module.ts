import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { MONGO_DB_CONNECTION } from "@/db/connection";
import { createMongooseConfigServiceClass } from "@/nestjs/db/mongo/config.service";

@Module({
  imports: [
    ...Object.values(MONGO_DB_CONNECTION).map((connectionName: string) => {
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
