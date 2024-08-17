import { ENV_CONFIG } from "@/nestjs/config/env.config";
import { MONGO_DB_CONFIG } from "@/nestjs/config/mongo.config";
import { POSTGRES_DB_CONFIG } from "@/nestjs/config/postgres.config";

export * from "@/nestjs/config/env.validation";

export default [ENV_CONFIG, ...MONGO_DB_CONFIG, ...POSTGRES_DB_CONFIG];
