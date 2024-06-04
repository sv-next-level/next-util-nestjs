export * from "./env.validation";
import { ENV_CONFIG } from "./env.config";
import { MONGOOSE_DB_CONFIG } from "./db.config";

export default [ENV_CONFIG, ...MONGOOSE_DB_CONFIG];
