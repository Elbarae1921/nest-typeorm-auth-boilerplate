import { Entity, Column, Index, BeforeInsert, AfterInsert } from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { hash, compare } from 'bcrypt';
import { AbstractEntity } from './AbstractEntity';

@Entity('users')
export class User extends AbstractEntity {
    constructor(
        username: string,
        email: string,
        password: string,
        admin?: boolean
    ) {
        super();
        this.username = username;
        this.email = email;
        this.password = password;
        this.admin = admin ?? false;
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

    @Column({ default: false })
    @Exclude()
    admin: boolean;

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
