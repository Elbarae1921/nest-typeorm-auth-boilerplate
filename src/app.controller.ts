import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { AuthUser } from './auth/user.decorator';
import { Role, User } from './entities/user.entity';
import { LoginDto, RegisterDto } from './models/auth.model';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    async getHello() {
        return 'Hello World';
    }

    @Post('register')
    async register(@Body() user: RegisterDto) {
        return this.authService.register(user);
    }

    @Post('login')
    async login(@Body() user: LoginDto) {
        return this.authService.login(user);
    }

    @Get('profile')
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(AuthGuard())
    getProfile(@AuthUser() user: User) {
        return user;
    }

    // admin only endpoint
    @Get('admin')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    getAdmin(@AuthUser() user: User) {
        return user;
    }
}
