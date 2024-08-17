import { Body, Controller, Get, Logger, Post, Version } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { ArticlesService } from "@/nestjs/app/articles/articles.service";
import { CreateArticleDto } from "@/nestjs/app/articles/dto/create-article.dto";

@ApiTags("Articles")
@Controller({
  path: "articles",
})
export class ArticlesController {
  private logger: Logger = new Logger(ArticlesController.name);

  constructor(private readonly articlesService: ArticlesService) {
    this.logger.debug({
      message: "Entering constructor of " + ArticlesController.name,
    });
  }

  @Version("1")
  @Get()
  @ApiOperation({ summary: "Get all articles" })
  @ApiResponse({ status: 200, description: "All articles list." })
  @ApiResponse({ status: 500, description: "Something went wrong!" })
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

  @Version("1")
  @Post()
  @ApiOperation({ summary: "Create new article" })
  @ApiResponse({ status: 200, description: "Created article." })
  @ApiResponse({ status: 500, description: "Something went wrong!" })
  @ApiBadRequestResponse({
    status: 400,
    description: "name should not be empty!",
  })
  @ApiBody({
    required: true,
    isArray: false,
    description: "Request body description",
    schema: {
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
      type: "object",
      example: {
        name: "John Doe",
      },
      title: "Create new article",
    },
  })
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
