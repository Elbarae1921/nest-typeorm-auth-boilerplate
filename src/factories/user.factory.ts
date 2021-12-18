import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Role, User } from '../entities/user.entity';

define(User, (faker: typeof Faker) => {
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const password = 'password';
    const user = new User(username, email, password, [Role.ADMIN, Role.USER]);
    console.log('username: ', username);
    console.log('email: ', email);
    user.save();
    return user;
});
