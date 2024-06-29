import { MONGOOSE_DB_CONFIG } from "@/nestjs/config/db.config";
import { ENV_CONFIG } from "@/nestjs/config/env.config";

export * from "@/nestjs/config/env.validation";

export default [ENV_CONFIG, ...MONGOOSE_DB_CONFIG];
