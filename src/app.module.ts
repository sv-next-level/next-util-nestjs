import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppService } from "./app.service";
import { ApiModule } from "./app/api/api.module";
import { AppController } from "./app.controller";
import configuration, { validate } from "./config";
import { ApiController } from "./app/api/api.controller";
import { DatabaseModule } from "./db/mongo/database.module";

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
    DatabaseModule,
  ],
  controllers: [ApiController, AppController],
  providers: [AppService],
})
export class AppModule {}
