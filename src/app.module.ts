import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppService } from "./app.service";
import { ApiModule } from "./app/api/api.module";
import { AppController } from "./app.controller";
import configuration, { validate } from "./config";
import { UserService } from "./app/user/user.service";
import { ApiController } from "./app/api/api.controller";
import { UserController } from "./app/user/user.controller";
import { RedisDatabaseModule } from "./db/redis/database.module";
import { MongooseDatabaseModule } from "./db/mongo/database.module";
import { MongooseModelsModule } from "./db/mongo/mongoose-models.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configuration,
      expandVariables: true,
      isGlobal: true,
      cache: true,
      validate,
    }),
    ApiModule,
    RedisDatabaseModule,
    MongooseModelsModule,
    MongooseDatabaseModule,
  ],
  controllers: [ApiController, AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
