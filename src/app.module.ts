import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration, { validate } from "@/nestjs/config";

import { ApiModule } from "@/nestjs/app/api/api.module";
import { ArticlesModule } from "@/nestjs/app/articles/articles.module";

import { MongooseDatabaseModule } from "@/nestjs/db/mongo/database.module";
import { MongooseModelsModule } from "@/nestjs/db/mongo/models.module";
import { DrizzleDatabaseModule } from "@/nestjs/db/postgres/drizzle/database.module";
import { RedisDatabaseModule } from "@/nestjs/db/redis/database.module";

import { AppController } from "@/nestjs/app.controller";
import { AppService } from "@/nestjs/app.service";

import { UserModule } from "./app/user/user.module";

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
    UserModule,
    RedisDatabaseModule,
    MongooseModelsModule,
    MongooseDatabaseModule,
    DrizzleDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
