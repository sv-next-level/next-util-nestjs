import { ModelDefinition } from "@nestjs/mongoose";

import { articles } from "@/nestjs/app/articles/entity/articles.entity";

// import {
//   USER_SCHEMA_NAME,
//   UserSchema,
// } from "@/nestjs/app/user/entity/user.entity";

import { CONNECTION } from "@/common/db/mongo/connection";

export interface MongooseDbSchema {
  connectionName: string;
  models: ModelDefinition[];
}

export enum MONGO_DB_CONNECTION {
  MAIN = CONNECTION.TEST_CONN_MAIN,
}

export enum POSTGRES_DB_CONNECTION {
  MAIN = CONNECTION.TEST_CONN_MAIN + "N",
}
export const POSTGRES_DB_SCHEMA = {
  articles,
};
export const POSTGRES_DB_SCHEMA_PATH = [
  "./src/app/articles/entity/articles.entity.ts",
];

export const MONGOOSE_DB_SCHEMA = {
  // [MONGO_DB_CONNECTION.MAIN]: [
  //   {
  //     // default collection name
  //     name: USER_SCHEMA_NAME,
  //     // Schema instance
  //     schema: UserSchema,
  //     // name of the collection [override default name]
  //     collection: "all_users",
  //     // if there else []
  //     discriminators: [],
  //   },
  // ],
};

export enum REDIS_DB_CONNECTION {
  MAIN = CONNECTION.TEST_CONN_MAIN,
}
