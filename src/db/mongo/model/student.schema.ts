import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Student {
  // kind: string;

  @Prop({ type: Number, required: true })
  fee: number;
}

export const STUDENT_SCHEMA_NAME: string = Student.name;

export const StudentSchema = SchemaFactory.createForClass(Student);

export type StudentDocument = Student & Document & { _id: string };
