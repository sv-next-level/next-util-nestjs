import { Module } from "@nestjs/common";
import { UserController } from "@/nestjs/app/user/user.controller";
import { UserService } from "@/nestjs/app/user/user.service";

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
