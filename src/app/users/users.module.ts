import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  USER_SCHEMA_NAME,
  UserSchema,
} from "@/nestjs/app/users/entity/users.entity";
import { UsersController } from "@/nestjs/app/users/users.controller";
import { UsersService } from "@/nestjs/app/users/users.service";

import { MONGO_DB_CONNECTION } from "@/db/connection";
import { RedisDatabaseModule } from "@/nestjs/db/redis/database.module";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: USER_SCHEMA_NAME, schema: UserSchema }],
      MONGO_DB_CONNECTION.MAIN,
    ),
    RedisDatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
