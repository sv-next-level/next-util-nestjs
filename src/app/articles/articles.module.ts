import { Module } from "@nestjs/common";

import { ArticlesController } from "@/nestjs/app/articles/articles.controller";
import { ArticlesService } from "@/nestjs/app/articles/articles.service";

import { RedisDatabaseModule } from "@/nestjs/db/redis/database.module";

@Module({
  imports: [RedisDatabaseModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
