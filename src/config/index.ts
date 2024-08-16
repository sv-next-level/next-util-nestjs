import { ENV_CONFIG } from "@/nestjs/config/env.config";
import { MONGO_DB_CONFIG } from "@/nestjs/config/mongo.config";

export * from "@/nestjs/config/env.validation";

export default [ENV_CONFIG, ...MONGO_DB_CONFIG];
