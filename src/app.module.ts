import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration, { validate } from "@/nestjs/config";

import { ApiController } from "@/nestjs/app/api/api.controller";
import { ApiModule } from "@/nestjs/app/api/api.module";
import { ArticlesModule } from "@/nestjs/app/articles/articles.module";
import { UserController } from "@/nestjs/app/user/user.controller";
import { UserService } from "@/nestjs/app/user/user.service";

import { MongooseDatabaseModule } from "@/nestjs/db/mongo/database.module";
import { MongooseModelsModule } from "@/nestjs/db/mongo/models.module";
import { DrizzleDatabaseModule } from "@/nestjs/db/postgres/drizzle/database.module";
import { RedisDatabaseModule } from "@/nestjs/db/redis/database.module";

import { AppController } from "@/nestjs/app.controller";
import { AppService } from "@/nestjs/app.service";

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
    ArticlesModule,
    RedisDatabaseModule,
    MongooseModelsModule,
    MongooseDatabaseModule,
    DrizzleDatabaseModule,
  ],
  controllers: [ApiController, AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
