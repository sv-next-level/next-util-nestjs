import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({
    description: "User name",
    example: "John Doe",
    required: true,
    type: String,
    title: "Name",
  })
  @Prop({
    type: String,
    required: true,
  })
  name: string;
}

export const USER_SCHEMA_NAME: string = User.name;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document & { _id: string };
