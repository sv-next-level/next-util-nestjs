import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { ApiService } from ".";

@Module({
  imports: [HttpModule],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
