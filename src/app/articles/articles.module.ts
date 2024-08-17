import { Module } from "@nestjs/common";

import { ArticlesController } from "@/nestjs/app/articles/articles.controller";
import { ArticlesService } from "@/nestjs/app/articles/articles.service";

@Module({
  imports: [],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
