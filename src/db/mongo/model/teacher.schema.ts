import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Teacher {
  // kind: string;

  @Prop({ type: Number, required: true })
  salary: number;
}

export const TEACHER_SCHEMA_NAME: string = Teacher.name;

export const TeacherSchema = SchemaFactory.createForClass(Teacher);

export type TeacherDocument = Teacher & Document & { _id: string };
