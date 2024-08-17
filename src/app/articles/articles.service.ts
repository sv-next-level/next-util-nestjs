import { eq } from "drizzle-orm";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateArticleDto } from "@/nestjs/app/articles/dto/create-article.dto";
import { UpdateArticleDto } from "@/nestjs/app/articles/dto/update-article.dto";
import { articles as articlesEntity } from "@/nestjs/app/articles/entity/articles.entity";

import { DrizzleService } from "@/db/postgres/drizzle/drizzle.service";

@Injectable()
export class ArticlesService {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAll() {
    return this.drizzleService.db.select().from(articlesEntity);
  }

  async getById(id: number) {
    const articles = await this.drizzleService.db
      .select()
      .from(articlesEntity)
      .where(eq(articlesEntity.id, id));
    const article = articles.pop();
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  async create(article: CreateArticleDto) {
    const createdArticles = await this.drizzleService.db
      .insert(articlesEntity)
      .values(article)
      .returning();

    return createdArticles.pop();
  }

  async update(id: number, article: UpdateArticleDto) {
    const updatedArticles = await this.drizzleService.db
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
    const deletedArticles = await this.drizzleService.db
      .delete(articlesEntity)
      .where(eq(articlesEntity.id, id))
      .returning();

    if (deletedArticles.length === 0) {
      throw new NotFoundException();
    }
  }
}
