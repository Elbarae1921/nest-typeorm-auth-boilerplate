import { Seeder, Factory } from "typeorm-seeding";
import { User } from "../entities/user.entity";

export default class CreateUser implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(User)().create();
    }
}
