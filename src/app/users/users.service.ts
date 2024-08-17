import { Model } from "mongoose";

import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateUsersDto } from "@/nestjs/app/users/dto/create-user.dto";
import {
  USER_SCHEMA_NAME,
  UserDocument,
} from "@/nestjs/app/users/entity/users.entity";

import { MONGO_DB_CONNECTION } from "@/nestjs/db/connection";
import { RedisService } from "@/nestjs/db/redis/config.service";

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(USER_SCHEMA_NAME, MONGO_DB_CONNECTION.MAIN)
    private readonly User: Model<UserDocument>,
    private readonly Redis: RedisService,
  ) {
    this.logger.debug({
      message: "Entering constructor of " + UsersService.name,
    });
  }

  async getAll() {
    try {
      this.logger.debug({
        message: "Entering getAll of " + UsersService.name,
      });

      let users = await this.Redis.get("users");
      if (users) {
        this.logger.log({
          message: "get redis response",
          users: users,
        });
        return users;
      }

      users = await this.User.find({});
      this.logger.log({
        message: "get mongoose response",
        users: users,
      });

      await this.Redis.set("users", users, 10);

      return users;
    } catch (err) {
      this.logger.error({
        error: err.message,
      });
      throw err;
    }
  }

  async create(newUser: CreateUsersDto) {
    try {
      this.logger.debug({
        message: "Entering create of " + UsersService.name,
        user: newUser,
      });

      const user = await this.User.create(newUser);
      this.logger.log({
        message: "create response",
        user: user,
      });

      return user;
    } catch (err) {
      this.logger.error({
        error: err.message,
        user: newUser,
      });
      throw err;
    }
  }
}
