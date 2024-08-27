import { Body, Controller, Get, Logger, Post, Version } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateUsersDto } from "@/nestjs/app/users/dto/create-user.dto";
import { UserDocument } from "@/nestjs/app/users/entities/user.mongo.entity";
import { UsersService } from "@/nestjs/app/users/users.service";

@ApiTags("Users")
@Controller({
  path: "users",
})
export class UsersController {
  private logger: Logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {
    this.logger.debug({
      message: "Entering constructor of " + UsersController.name,
    });
  }

  @Version("1")
  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "All users list." })
  @ApiResponse({ status: 500, description: "Something went wrong!" })
  async getAll() {
    try {
      this.logger.debug({
        message: "Entering get route",
      });

      const users: any = await this.usersService.getAll();
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
        message: "Error getting users",
        error: error,
      });
      return {
        statusCode: 500,
        success: false,
        error: error.message,
      };
    }
  }

  @Version("1")
  @Post()
  @ApiOperation({ summary: "Create new user" })
  @ApiResponse({ status: 200, description: "Created user." })
  @ApiResponse({ status: 500, description: "Something went wrong!" })
  @ApiBadRequestResponse({
    status: 400,
    description: "name should not be empty!",
  })
  async create(@Body() createUsersDto: CreateUsersDto) {
    try {
      this.logger.debug({
        message: "Entering create user route",
        createUsersDto: createUsersDto,
      });
      const user: UserDocument = await this.usersService.create(createUsersDto);
      this.logger.log({
        message: "After creating user",
        id: user._id,
      });

      return {
        statusCode: 200,
        success: true,
        data: user,
      };
    } catch (error) {
      this.logger.error({
        message: "Error creating user",
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
