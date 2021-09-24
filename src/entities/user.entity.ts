import { Entity, Column, Index, BeforeInsert, AfterInsert } from "typeorm";
import { classToPlain, Exclude } from "class-transformer";
import { hash, compare } from "bcrypt";
import { AbstractEntity } from "./AbstractEntity";

export enum Role {
    ADMIN = "admin",
    USER = "user"
}

@Entity("users")
export class User extends AbstractEntity {
    constructor(
        username: string,
        email: string,
        password: string,
        roles?: Role[]
    ) {
        super();
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles ?? [Role.USER];
    }

    @Column({ length: 32 })
    @Index({ unique: true })
    username: string;

    @Column({ length: 60 })
    @Exclude()
    password: string;

    @Column({ length: 320 })
    @Index({ unique: true })
    email: string;

    @Column({ type: "text", default: [Role.USER], array: true })
    @Exclude()
    roles: Role[];

    @BeforeInsert()
    async setPassword() {
        this.password = await hash(
            this.password,
            Number(process.env.BCRYPT_ROUNDS)
        );
    }

    @AfterInsert()
    lowerCaseId() {
        this.id = this.id.toLowerCase();
    }

    toJSON() {
        return classToPlain(this);
    }

    async comparePassword(password: string) {
        return await compare(password, this.password);
    }
}
