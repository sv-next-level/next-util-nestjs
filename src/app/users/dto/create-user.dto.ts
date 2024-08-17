import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    isArray: false,
    description: "User name description",
    example: "John Doe",
    type: String,
    title: "Name",
    maxLength: 255,
  })
  name: string;
}
