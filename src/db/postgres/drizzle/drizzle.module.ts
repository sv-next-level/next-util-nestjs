import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { POSTGRES_DB_CONNECTION } from "@/db/connection";
import { DatabaseModule } from "@/nestjs/db/postgres/drizzle/database.module";

@Global()
@Module({
  imports: [
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>(
          `${POSTGRES_DB_CONNECTION.MAIN}.dbUri`,
        );
        return {
          url,
        };
      },
    }),
  ],
  exports: [DatabaseModule],
  providers: [DatabaseModule],
})
export class DrizzleDatabaseModule {}
