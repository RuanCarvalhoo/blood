import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import cors from "cors";
import { env } from "@/config/env";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cors());
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Swagger (minimal setup)
  const config = new DocumentBuilder()
    .setTitle("Blood API")
    .setDescription("API documentation")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
  const port = env.PORT || 4000;
  await app.listen(port);
  console.log(`Nest API listening at http://localhost:${port}`);
}

bootstrap();
