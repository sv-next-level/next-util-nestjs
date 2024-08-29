import { Article } from "@/nestjs/app/articles/entities/article.drizzle.entity";

// import {
//   USER_ENTITY_NAME,
//   UserEntity,
// } from "@/nestjs/app/user/entity/user.entity";

import { CONNECTION as MG_CONNECTION } from "@/common/db/mongo/connection";
import { CONNECTION as PG_CONNECTION } from "@/common/db/postgres/connection";

export enum MONGO_DB_CONNECTION {
  MAIN = MG_CONNECTION.TEST_CONN_MAIN,
}

export enum POSTGRES_DB_CONNECTION {
  MAIN = PG_CONNECTION.TEST_CONN_MAIN,
}

export const POSTGRES_DB_SCHEMA = {
  Article,
};

export const POSTGRES_DB_SCHEMA_PATH = [
  "./src/app/articles/entities/**.drizzle.entity.ts",
];

export const MONGOOSE_DB_SCHEMA = {
  // [MONGO_DB_CONNECTION.MAIN]: [
  //   {
  //     // default collection name
  //     name: USER_ENTITY_NAME,
  //     // Schema instance
  //     schema: UserEntity,
  //     // name of the collection [override default name]
  //     collection: "all_users",
  //     // if there else []
  //     discriminators: [],
  //   },
  // ],
};

export enum REDIS_DB_CONNECTION {
  MAIN = MG_CONNECTION.TEST_CONN_MAIN,
}
