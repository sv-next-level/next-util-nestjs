import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";

import { ArticlesService } from "@/nestjs/app/articles/articles.service";
import { CreateArticleDto } from "@/nestjs/app/articles/dto/create-article.dto";
import { UpdateArticleDto } from "@/nestjs/app/articles/dto/update-article.dto";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getAll() {
    return this.articlesService.getAll();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.articlesService.getById(id);
  }

  @Post()
  create(@Body() article: CreateArticleDto) {
    return this.articlesService.create(article);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() article: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, article);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    await this.articlesService.delete(id);
  }
}
