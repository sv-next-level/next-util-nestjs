import {
  INestApplication,
  Logger,
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "@/nestjs/app.module";

const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  stopAtFirstError: true,
};

async function bootstrap() {
  const logger: Logger = new Logger("main");

  const app: INestApplication<any> =
    await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  const configService: ConfigService<unknown, boolean> = app.get(ConfigService);

  const PORT: number = configService.get<number>("PORT");
  const ENV: string = configService.get<string>("NODE_ENV");

  const config = new DocumentBuilder()
    .setTitle("Nestjs Util Library")
    .setDescription("The Swagger API Description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document, {
    useGlobalPrefix: true,
    swaggerUiEnabled: true,
    customSiteTitle: "Nestjs Documentation",
  });

  await app.listen(PORT);

  logger.verbose(`\nENV: ${ENV}\nPORT: ${PORT}\nURL: ${await app.getUrl()}\n`);
}

bootstrap();
