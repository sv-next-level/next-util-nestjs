import { ModelDefinition } from "@nestjs/mongoose";

import {
  STUDENT_SCHEMA_NAME,
  StudentSchema,
} from "@/nestjs/db/mongo/model/student.schema";
import {
  TEACHER_SCHEMA_NAME,
  TeacherSchema,
} from "@/nestjs/db/mongo/model/teacher.schema";
import {
  USER_SCHEMA_NAME,
  UserSchema,
} from "@/nestjs/db/mongo/model/user.schema";

import { CONNECTION } from "@/common/db/mongo/connection";

export interface MongooseDbSchema {
  connectionName: string;
  models: ModelDefinition[];
}

export enum MONGOOSE_DB_CONNECTION {
  MAIN = CONNECTION.TEST_CONN_MAIN,
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
  MAIN = CONNECTION.TEST_CONN_MAIN,
}
