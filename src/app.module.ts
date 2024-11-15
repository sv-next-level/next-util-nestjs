import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration, { validate } from "@/nestjs/config";
import { SECRET_CONFIG } from "@/nestjs/config/secret.config";

import { ApiModule } from "@/nestjs/app/api/api.module";
import { ArticlesModule } from "@/nestjs/app/articles/articles.module";
import { CipherModule } from "@/nestjs/app/cipher/cipher.module";
import { UsersModule } from "@/nestjs/app/users/users.module";

import { MongooseDatabaseModule } from "@/nestjs/db/mongo/database.module";
import { MongooseModelsModule } from "@/nestjs/db/mongo/models.module";
import { DrizzleDatabaseModule } from "@/nestjs/db/postgres/drizzle/drizzle.module";
import { RedisDatabaseModule } from "@/nestjs/db/redis/database.module";

import { AppController } from "@/nestjs/app.controller";
import { AppService } from "@/nestjs/app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [SECRET_CONFIG, ...configuration],
      expandVariables: true,
      isGlobal: true,
      cache: true,
      validate,
    }),
    ApiModule,
    ArticlesModule,
    UsersModule,
    CipherModule,
    RedisDatabaseModule,
    MongooseModelsModule,
    MongooseDatabaseModule,
    DrizzleDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
