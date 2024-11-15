import { IsNotEmpty, IsString } from "class-validator";

export class UpdateArticleDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
}
