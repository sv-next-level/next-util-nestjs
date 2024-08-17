import { Module } from "@nestjs/common";

import { UserController } from "@/nestjs/app/user/user.controller";
import { UserService } from "@/nestjs/app/user/user.service";

import { RedisDatabaseModule } from "@/db/redis/database.module";

@Module({
  imports: [RedisDatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
