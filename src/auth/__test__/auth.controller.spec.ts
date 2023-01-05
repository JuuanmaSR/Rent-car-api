import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/users/entities/userEntity';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { AuthController } from '../auth.controller';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { JwtStrategy } from '../jwt.strategy';

const userRegisterData: RegisterAuthDto = {
  username: 'juanma',
  password: 'asdsadqwer',
  email: 'example@gmail.com',
};

const userLoginData: LoginAuthDto = {
  email: 'example@gmail.com',
  password: 'asdasdasd',
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UsersService;

  beforeEach(async () => {
    const module = Test.createTestingModule({
      imports: [AuthModule],
    });

    userService = new UsersService(User);
    jwtService = new JwtService();
    service = new AuthService(jwtService, userService);
    controller = new AuthController(service);
  });

  describe('register a user', () => {
    const result: UserEntity = {
      id: 1,
      username: 'juanma',
      password: 'asdsadqwer',
      email: 'example@gmail.com',
      role: 'user',
    };

    it('must return a registered user of type UserEntity', async () => {
      jest
        .spyOn(service, 'register')
        .mockImplementation(() =>
          Promise.resolve(result as unknown as Promise<User>),
        );
      const controllerResult = await controller.register(userRegisterData);

      expect(controllerResult instanceof UserEntity);
      expect(controllerResult).toMatchObject({
        username: expect.any(String),
        email: expect.any(String),
      });
      expect(controllerResult).toHaveProperty('username', result.username);
      expect(controllerResult).toHaveProperty('email', result.email);
      expect(service.register).toHaveBeenCalledTimes(1);
    });
  });

  describe('login a user', () => {
    const result = {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    };

    it('must return a JSON with an access_token key', async () => {
      jest
        .spyOn(service, 'login')
        .mockImplementation(() => Promise.resolve(result));
      const controllerResult = await controller.login(userLoginData);

      expect(controllerResult).toEqual(result);
      expect(controllerResult).toHaveProperty(
        'access_token',
        result.access_token,
      );
      expect(controllerResult).toMatchObject({
        access_token: expect.any(String),
      });
      expect(service.login).toHaveBeenCalledTimes(1);
    });
  });
});
