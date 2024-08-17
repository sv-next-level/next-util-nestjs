import { Controller, Get, Logger } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "@/nestjs/app.service";

@ApiTags("Server")
@Controller()
export class AppController {
  private logger: Logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Check health of server" })
  @ApiResponse({ status: 200, description: "Majama!" })
  getHello(): string {
    return this.appService.kemChho();
  }
}
