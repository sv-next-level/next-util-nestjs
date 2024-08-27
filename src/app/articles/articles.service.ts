import { eq } from "drizzle-orm";

import { Injectable, Logger, NotFoundException } from "@nestjs/common";

import { CreateArticleDto } from "@/nestjs/app/articles/dto/create-article.dto";
import { UpdateArticleDto } from "@/nestjs/app/articles/dto/update-article.dto";
import { Article } from "@/nestjs/app/articles/entities/article.drizzle.entity";

import { DrizzleService } from "@/nestjs/db/postgres/drizzle/drizzle.service";
import { RedisService } from "@/nestjs/db/redis/config.service";

@Injectable()
export class ArticlesService {
  private logger: Logger = new Logger(ArticlesService.name);

  constructor(
    private readonly Redis: RedisService,
    private readonly Drizzle: DrizzleService,
  ) {
    this.logger.debug({
      message: "Entering constructor of " + ArticlesService.name,
    });
  }

  async getAll() {
    try {
      this.logger.debug({
        message: "Entering getAll of " + ArticlesService.name,
      });

      let articles = await this.Redis.get("articles");
      if (articles) {
        this.logger.log({
          message: "get redis response",
          articles: articles,
        });
        return articles;
      }

      articles = await this.Drizzle.db.select().from(Article);
      this.logger.log({
        message: "get postgres response",
        articles: articles,
      });

      await this.Redis.set("articles", articles, 10);

      return articles;
    } catch (err) {
      this.logger.error({
        error: err.message,
      });
      throw err;
    }
  }

  async create(newArticle: CreateArticleDto) {
    try {
      this.logger.debug({
        message: "Entering create of " + ArticlesService.name,
        article: newArticle,
      });

      const createdArticles = await this.Drizzle.db
        .insert(Article)
        .values(newArticle)
        .returning();

      const article = createdArticles.pop();

      this.logger.log({
        message: "create response",
        article: article,
      });

      return article;
    } catch (err) {
      this.logger.error({
        error: err.message,
        article: newArticle,
      });
      throw err;
    }
  }

  async getById(id: number) {
    const articles = await this.Drizzle.db
      .select()
      .from(Article)
      .where(eq(Article.id, id));
    const article = articles.pop();
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  async update(id: number, article: UpdateArticleDto) {
    const updatedArticles = await this.Drizzle.db
      .update(Article)
      .set(article)
      .where(eq(Article.id, id))
      .returning();

    if (updatedArticles.length === 0) {
      throw new NotFoundException();
    }

    return updatedArticles.pop();
  }

  async delete(id: number) {
    const deletedArticles = await this.Drizzle.db
      .delete(Article)
      .where(eq(Article.id, id))
      .returning();

    if (deletedArticles.length === 0) {
      throw new NotFoundException();
    }
  }
}
