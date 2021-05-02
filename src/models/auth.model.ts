import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class RegisterDto {
    @MaxLength(32)
    @IsString()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;
}

export interface AuthPayload {
    id: string;

    username: string;

    isAdmin: boolean;
}
