import { Body, Controller, Get, Logger, Post } from "@nestjs/common";

import { ArticlesService } from "@/nestjs/app/articles/articles.service";
import { CreateArticleDto } from "@/nestjs/app/articles/dto/create-article.dto";

@Controller("articles")
export class ArticlesController {
  private logger: Logger = new Logger(ArticlesController.name);

  constructor(private readonly articlesService: ArticlesService) {
    this.logger.debug({
      message: "Entering constructor of " + ArticlesController.name,
    });
  }

  @Get()
  async getAll() {
    try {
      this.logger.debug({
        message: "Entering get route",
      });

      const articles: any = await this.articlesService.getAll();
      this.logger.log({
        message: "After getting articles",
        articles_length: articles.length,
      });

      return {
        statusCode: 200,
        success: true,
        data: articles,
      };
    } catch (error) {
      this.logger.error({
        message: "Error getting articles",
        error: error,
      });
      return {
        statusCode: 500,
        success: false,
        error: error.message,
      };
    }
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    try {
      this.logger.debug({
        message: "Entering create article route",
        createArticleDto: createArticleDto,
      });

      const article = await this.articlesService.create(createArticleDto);
      this.logger.log({
        message: "After creating article",
        id: article.id,
      });

      return {
        statusCode: 200,
        success: true,
        data: article,
      };
    } catch (error) {
      this.logger.error({
        message: "Error creating article",
        error: error,
      });
      return {
        statusCode: 500,
        success: false,
        error: error.message,
      };
    }
  }
}
