import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import {
  USER_SCHEMA_NAME,
  UserDocument,
} from "../../db/mongo/model/user.schema";
import { MONGOOSE_DB_CONNECTION } from "@/db/connection";
import { RedisService } from "@/db/redis/redis-config.service";

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(USER_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.MAIN)
    private readonly User: Model<UserDocument>,
    private readonly Redis: RedisService
  ) {
    this.logger.debug({
      message: "Entering constructor of " + UserService.name,
    });
  }

  async set(newUser: any) {
    try {
      this.logger.debug({
        message: "Entering set of " + UserService.name,
        user: newUser,
      });

      const user = await this.User.create(newUser);
      this.logger.log({
        message: "set response",
        user: user,
      });

      await this.Redis.set(user._id, user, 30);

      return user;
    } catch (err) {
      this.logger.error({
        error: err.message,
        user: newUser,
      });
      throw err;
    }
  }
  async get() {
    try {
      this.logger.debug({
        message: "Entering get of " + UserService.name,
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

      await this.Redis.set("users", users, 5);

      return users;
    } catch (err) {
      this.logger.error({
        error: err.message,
      });
      throw err;
    }
  }
}
