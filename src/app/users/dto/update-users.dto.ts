import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUsersDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
}
