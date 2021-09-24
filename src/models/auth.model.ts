import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Role } from "src/entities/user.entity";

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

    roles: Role[];
}
