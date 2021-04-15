import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const NODE_ENV = this.configService.get<string>('NODE_ENV');
        return {
            name: 'default',
            type: 'postgres',
            host: this.configService.get<string>('TYPEORM_HOST'),
            port: Number(this.configService.get<string>('TYPEORM_PORT')),
            username: this.configService.get<string>('TYPEORM_USERNAME'),
            password: this.configService.get<string>('TYPEORM_PASSWORD'),
            database: this.configService.get<string>('TYPEORM_DATABASE'),
            synchronize: false,
            dropSchema: false,
            logging: ['error', 'warn'],

            entities: [`${NODE_ENV === 'test' ? 'src' : 'dist'}/**/**.entity{.ts,.js}`],
            cli: {
                migrationsDir: '../migrations'
            }
        };
    }
}
