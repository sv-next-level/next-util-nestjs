import { CONNECTION } from "@/common/db/mongo/connection";
import { ModelDefinition } from "@nestjs/mongoose";
import { USER_SCHEMA_NAME, UserSchema } from "./mongo/model/user.schema";
import {
  STUDENT_SCHEMA_NAME,
  StudentSchema,
} from "./mongo/model/student.schema";
import {
  TEACHER_SCHEMA_NAME,
  TeacherSchema,
} from "./mongo/model/teacher.schema";

export interface MongooseDbSchema {
  connectionName: string;
  models: ModelDefinition[];
}

export enum MONGOOSE_DB_CONNECTION {
  MAIN = CONNECTION.TEST_MAIN,
}

export const MONGOOSE_DB_SCHEMA = {
  [MONGOOSE_DB_CONNECTION.MAIN]: [
    {
      // default collection name
      name: USER_SCHEMA_NAME,
      // Schema instance
      schema: UserSchema,
      // name of the collection [override default name]
      collection: "all_users",
      // if there else []
      discriminators: [
        {
          name: STUDENT_SCHEMA_NAME,
          schema: StudentSchema,
        },
        {
          name: TEACHER_SCHEMA_NAME,
          schema: TeacherSchema,
        },
      ],
    },
  ],
};

export enum REDIS_DB_CONNECTION {
  MAIN = CONNECTION.TEST_MAIN,
}
