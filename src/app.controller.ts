import { Controller, Post, UseGuards, Body, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "./auth/admin.guard";
import { AuthService } from "./auth/auth.service";
import { AuthUser } from "./auth/user.decorator";
import { User } from "./entities/user.entity";
import { LoginDto, RegisterDto } from "./models/auth.model";

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    async getHello() {
        return "Hello World";
    }

    @Post("register")
    async register(@Body() user: RegisterDto) {
        return this.authService.register(user);
    }

    @Post("login")
    async login(@Body() user: LoginDto) {
        return this.authService.login(user);
    }

    @Get("profile")
    @UseGuards(AuthGuard())
    getProfile(@AuthUser() user: User) {
        return user;
    }

    // admin only endpoint
    @Get("admin")
    @UseGuards(AuthGuard(), AdminGuard)
    getAdmin(@AuthUser() user: User) {
        return user;
    }
}
