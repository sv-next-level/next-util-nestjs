import { ENV_CONFIG } from "@/nestjs/config/env.config";
import { MONGOOSE_DB_CONFIG } from "@/nestjs/config/mongo.config";

export * from "@/nestjs/config/env.validation";

export default [ENV_CONFIG, ...MONGOOSE_DB_CONFIG];
