import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";

import { RedisService } from "./redis-config.service";
import { REDIS_DB_CONNECTION } from "@/db/connection";

@Module({
  imports: [
    ...Object.values(REDIS_DB_CONNECTION).map(
      (connectionName: string, index: number) => {
        return CacheModule.registerAsync({
          isGlobal: true,
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            store: await redisStore({
              url: configService.get<string>(`${connectionName}_REDIS_URI`),
              name: connectionName,
              database: index,
            }),
          }),
        });
      }
    ),
  ],

  providers: [RedisService],
  exports: [RedisService],
})
export class RedisDatabaseModule {}
