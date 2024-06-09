import { Controller, Get, Logger } from "@nestjs/common";

import { AppService } from "./app.service";
import { RedisService } from "./db/redis/redis-config.service";

@Controller()
export class AppController {
  private logger: Logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.kemChho();
  }
}
