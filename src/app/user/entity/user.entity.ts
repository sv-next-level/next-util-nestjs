import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
  discriminatorKey: "kind",
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  name: string;
}

export const USER_SCHEMA_NAME: string = User.name;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document & { _id: string };
