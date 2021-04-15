import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class RegisterDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;
}

export interface AuthPayload {
    id: string;

    username: string;

    isAdmin: boolean;
}
