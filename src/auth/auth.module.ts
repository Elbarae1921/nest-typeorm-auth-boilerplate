import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: { expiresIn: "365d" }
        }),
        PassportModule.register({ defaultStrategy: "jwt" })
    ],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, JwtStrategy, AuthService]
})
export class AuthModule {}
