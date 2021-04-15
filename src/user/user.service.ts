import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public findByUsernameOrEmail(usernameOrEmail: string) {
        const user = this.userRepository.findOne({
            where: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });
        return user;
    }

    public findById(id: string) {
        const user = this.userRepository.findOne(id);
        return user;
    }

    public async findIfExists(username: string, email: string) {
        const user = await this.userRepository.findOne({
            where: [{ email }, { username }, { username: email }]
        });
        return !!user;
    }

    public async createUser(username: string, email: string, password: string) {
        const user = new User(username, email, password);
        return await this.userRepository.save(user);
    }
}
