import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppService } from "@/nestjs/app.service";
import { ApiModule } from "@/nestjs/app/api/api.module";
import { AppController } from "@/nestjs/app.controller";
import configuration, { validate } from "@/nestjs/config";
import { UserService } from "@/nestjs/app/user/user.service";
import { ApiController } from "@/nestjs/app/api/api.controller";
import { UserController } from "@/nestjs/app/user/user.controller";
import { RedisDatabaseModule } from "@/nestjs/db/redis/database.module";
import { MongooseDatabaseModule } from "@/nestjs/db/mongo/database.module";
import { MongooseModelsModule } from "@/nestjs/db/mongo/mongoose-models.module";

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
