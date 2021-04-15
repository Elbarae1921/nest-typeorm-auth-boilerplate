import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { AuthPayload } from "src/models/auth.model";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.JWT_SECRET}`
        });
    }

    async validate(payload: AuthPayload) {
        const { id } = payload;
        const user = await this.userService.findById(id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
