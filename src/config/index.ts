export * from "@/nestjs/config/env.validation";
import { ENV_CONFIG } from "@/nestjs/config/env.config";
import { MONGOOSE_DB_CONFIG } from "@/nestjs/config/db.config";

export default [ENV_CONFIG, ...MONGOOSE_DB_CONFIG];
