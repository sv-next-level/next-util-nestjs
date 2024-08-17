import { eq } from "drizzle-orm";

import { Injectable, Logger, NotFoundException } from "@nestjs/common";

import { CreateArticleDto } from "@/nestjs/app/articles/dto/create-article.dto";
import { UpdateArticleDto } from "@/nestjs/app/articles/dto/update-article.dto";
import { articles as articlesEntity } from "@/nestjs/app/articles/entity/articles.entity";

import { DrizzleService } from "@/nestjs/db/postgres/drizzle/drizzle.service";
import { RedisService } from "@/nestjs/db/redis/config.service";

@Injectable()
export class ArticlesService {
  private logger: Logger = new Logger(ArticlesService.name);

  constructor(
    private readonly Redis: RedisService,
    private readonly drizzle: DrizzleService,
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

      articles = await this.drizzle.db.select().from(articlesEntity);
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

      const createdArticles = await this.drizzle.db
        .insert(articlesEntity)
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
    const articles = await this.drizzle.db
      .select()
      .from(articlesEntity)
      .where(eq(articlesEntity.id, id));
    const article = articles.pop();
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  async update(id: number, article: UpdateArticleDto) {
    const updatedArticles = await this.drizzle.db
      .update(articlesEntity)
      .set(article)
      .where(eq(articlesEntity.id, id))
      .returning();

    if (updatedArticles.length === 0) {
      throw new NotFoundException();
    }

    return updatedArticles.pop();
  }

  async delete(id: number) {
    const deletedArticles = await this.drizzle.db
      .delete(articlesEntity)
      .where(eq(articlesEntity.id, id))
      .returning();

    if (deletedArticles.length === 0) {
      throw new NotFoundException();
    }
  }
}
