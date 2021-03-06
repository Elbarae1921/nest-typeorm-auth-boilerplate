import {
    Injectable,
    InternalServerErrorException,
    BadRequestException,
    ConflictException,
    Logger
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthPayload, LoginDto, RegisterDto } from 'src/models/auth.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly logger: Logger
    ) {
        this.logger.setContext(AuthService.name);
    }

    async register({ username, email, password }: RegisterDto) {
        try {
            const userExists = await this.userService.findIfExists(
                username,
                email
            );
            if (userExists) {
                throw new ConflictException({
                    message: 'username/email already in use',
                    statusCode: 409,
                    error: 'Conflict'
                });
            }
            const user = await this.userService.createUser(
                username,
                email,
                password
            );

            const payload: AuthPayload = {
                id: user.id,
                username: user.username,
                isAdmin: user.admin
            };
            const token = this.jwtService.sign(payload);
            return { token };
        } catch (err) {
            if (err.status === 409) throw err;
            this.logger.error(err);
            throw new InternalServerErrorException();
        }
    }

    async login({ username, password }: LoginDto) {
        try {
            const user = await this.userService.findByUsernameOrEmail(username);

            if (!user) {
                throw new BadRequestException({
                    message: 'username or email does not exist',
                    statusCode: 400,
                    error: 'Bad Request'
                });
            }
            if (!(await user.comparePassword(password))) {
                throw new BadRequestException({
                    message: 'Incorrect username or password',
                    statusCode: 400,
                    error: 'Bad Request'
                });
            }

            const payload: AuthPayload = {
                id: user.id,
                username: user.username,
                isAdmin: user.admin
            };
            const token = this.jwtService.sign(payload, {
                expiresIn: '365d', // expires in 365 days
                secret: `${process.env.JWT_SECRET}`
            });
            return { token };
        } catch (err) {
            if (err.status === 400) throw err;
            this.logger.error(err);
            throw new InternalServerErrorException();
        }
    }
}
