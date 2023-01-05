import { JwtService } from '@nestjs/jwt';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { createMemDb } from 'src/utils/testing-helpers/createMemDb';
import { AuthService } from '../auth.service';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { RegisterAuthDto } from '../dto/register-auth.dto';

describe('UserService', () => {
  let service: AuthService;
  let memoryDb: Sequelize;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeAll(async () => {
    memoryDb = await createMemDb([User]);
    userService = new UsersService(User);
    jwtService = new JwtService({ secret: 'JWT-SECRET' });
    service = new AuthService(jwtService, userService);
  });
  afterAll(async () => await memoryDb.close());

  describe('login a user', () => {
    const firstUser: RegisterAuthDto = {
      username: 'juanma',
      password: 'asdsadqwer',
      email: 'example@gmail.com',
    };

    const inputLoginData: LoginAuthDto = {
      email: firstUser.email,
      password: firstUser.password,
    };

    beforeEach(async () => {
      await service.register(firstUser);
    });
    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return a access_token if user is register on db', async () => {
      const result = await service.login(inputLoginData);
      expect(result).toHaveProperty('access_token');
    });

    it('must return a user not found error if user email is not valid', async () => {
      await expect(
        service.login({
          email: 'wrongemail@gmail.com',
          password: 'asdasdasd',
        }),
      ).rejects.toThrowError('User not found');
    });

    it('must return a password is not valid error if user password is wrong', async () => {
      await expect(
        service.login({
          email: inputLoginData.email,
          password: 'wrongpassword',
        }),
      ).rejects.toThrowError('Password is not valid');
    });
  });

  describe('Register a user', () => {
    const userInputData: RegisterAuthDto = {
      username: 'juanma',
      password: 'asdsadqwer',
      email: 'example@gmail.com',
    };

    it('must return a user instance of user model', async () => {
      const result = await service.register(userInputData);
      expect(result instanceof User).toEqual(true);
      expect(result.username).toEqual(userInputData.username);
      expect(result.email).toEqual(userInputData.email);
      expect(result.password).not.toEqual(userInputData.password);
    });

    it('must return email already exist error  ', async () => {
      await expect(service.register(userInputData)).rejects.toThrowError(
        'Email already exist',
      );
    });
  });
});
