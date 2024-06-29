import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsNumber,
  Max,
  Min,
  validateSync,
  ValidationError,
} from "class-validator";

import { Logger } from "@nestjs/common";

import { ENV } from "@/common/server/env";

class EnvValidationDTO {
  @IsEnum(ENV)
  NODE_ENV: ENV;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const logger: Logger = new Logger("EnvValidation");

  const validatedConfig = plainToInstance(EnvValidationDTO, config, {
    enableImplicitConversion: true,
  });
  const errors: ValidationError[] = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  const validationMessage: string = "Validation error count: " + errors.length;
  logger.verbose({
    message: validationMessage,
  });

  if (errors.length > 0) {
    logger.fatal({
      message: "Environment validation failed!",
    });
    throw new Error(JSON.stringify(errors));
  } else {
    logger.log({
      message: "Environment validation successful!",
    });
  }

  return validatedConfig;
}
