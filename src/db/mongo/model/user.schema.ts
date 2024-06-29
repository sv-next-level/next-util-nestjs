import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { STUDENT_SCHEMA_NAME } from "@/nestjs/db/mongo/model/student.schema";
import { TEACHER_SCHEMA_NAME } from "@/nestjs/db/mongo/model/teacher.schema";

@Schema({
  timestamps: true,
  discriminatorKey: "kind",
})
export class User {
  @Prop({
    type: String,
    required: true,
    enum: [STUDENT_SCHEMA_NAME, TEACHER_SCHEMA_NAME],
  })
  kind: string;
}

export const USER_SCHEMA_NAME: string = User.name;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document & { _id: string };
