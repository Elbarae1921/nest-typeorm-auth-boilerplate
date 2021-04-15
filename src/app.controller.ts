import { Controller, Post, UseGuards, Body, ValidationPipe, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AuthUser } from './auth/user.decorator';
import { User } from './entities/user.entity';
import { LoginDto } from './models/auth.model';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body(ValidationPipe) user: LoginDto) {
        return this.authService.login(user);
    }

    @Get('profile')
    @UseGuards(AuthGuard())
    getProfile(@AuthUser() user: User) {
        return user;
    }
}
