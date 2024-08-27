import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface DatabaseOptions {
  url: string;
}

export const {
  ConfigurableModuleClass: ConfigurableDatabaseModule,
  MODULE_OPTIONS_TOKEN: DATABASE_OPTIONS,
} = new ConfigurableModuleBuilder<DatabaseOptions>()
  .setClassMethodName("forRoot")
  .build();
