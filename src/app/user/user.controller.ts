import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDocument } from "../../db/mongo/model/user.schema";

@Controller("user")
export class UserController {
  private logger: Logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {
    this.logger.debug({
      message: "Entering constructor of " + UserController.name,
    });
  }

  @Get()
  async get(): Promise<any> {
    try {
      this.logger.debug({
        message: "Entering get route",
      });

      const users: any = await this.userService.get();
      this.logger.log({
        message: "After getting users",
        users_length: users.length,
      });

      return {
        statusCode: 200,
        success: true,
        data: users,
      };
    } catch (error) {
      this.logger.error({
        message: "Error getting todos",
        error: error,
      });
      return {
        statusCode: 500,
        success: false,
        error: error.message,
      };
    }
  }

  @Post()
  async set(@Body() userData: any): Promise<any> {
    try {
      this.logger.debug({
        message: "Entering set user route",
        userData: userData,
      });
      const user: UserDocument = await this.userService.set(userData);
      this.logger.log({
        message: "After set user",
        id: user._id,
      });

      return {
        statusCode: 200,
        success: true,
        data: user,
      };
    } catch (error) {
      this.logger.error({
        message: "Error set user",
        error: error,
      });
      return {
        statusCode: 500,
        success: false,
        error: error.message,
      };
    }
  }
}
