import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.ms(),
                utilities.format.nestLike()
            ),
            transports: [new transports.Console()]
        })
    });
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.listen(`${process.env.PORT}`);
}
bootstrap();
