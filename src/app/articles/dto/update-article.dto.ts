import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateArticleDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;

  @IsString()
  @IsNotEmpty()
  title?: string;
}
