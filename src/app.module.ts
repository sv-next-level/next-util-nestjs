import { Module } from "@nestjs/common";

import { AppService } from "@/app.service";
import { ApiModule } from "@/app/api/api.module";
import { AppController } from "@/app.controller";
import { ApiController } from "@/app/api/api.controller";
import { ConfigModule } from "@nestjs/config";
import configuration, { validate } from "@/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configuration,
      expandVariables: true,
      isGlobal: true,
      cache: true,
      validate,
    }),
    ApiModule,
  ],
  controllers: [ApiController, AppController],
  providers: [AppService],
})
export class AppModule {}
