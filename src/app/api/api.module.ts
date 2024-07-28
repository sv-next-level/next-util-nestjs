import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { ApiService } from ".";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
