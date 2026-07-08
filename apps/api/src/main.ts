import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./modules/app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle("AI Hospital Assistant API")
      .setDescription("Versioned REST API for the AI Hospital Assistant platform.")
      .setVersion("0.1.0")
      .addBearerAuth()
      .build()
  );
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(config.get<number>("PORT", 3000));
}

void bootstrap();
