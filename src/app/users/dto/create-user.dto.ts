import { IsNotEmpty, IsString } from "class-validator";

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
