import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database-connection.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './middleware/logger.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConnectionService
        }),
        AuthModule,
        UserModule,
        LoggerModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
