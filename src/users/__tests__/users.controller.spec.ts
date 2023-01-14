import { getModelToken } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';
import { UserEntity } from '../entities/userEntity';
import { CreateUserDto } from '../dto/create-user.dto';

const user: UserEntity = {
  id: 1,
  username: 'juanma',
  password: 'asdsadqwer',
  email: 'example@gmail.com',
  role: 'user',
};

const userResponse = {
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
};

const userInputData: CreateUserDto = {
  username: user.username,
  password: user.password,
  email: user.email,
};

const userArrayResponse = [
  {
    id: 1,
    username: 'juanma',
    email: 'example@gmail.com',
    role: 'admin',
  },
  {
    id: 2,
    username: 'mili',
    email: 'example@gmail.com',
    role: 'user',
  },
];

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken(User))
      .useValue(jest.fn())
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('find users', () => {
    it('must return an Array of type UserEntity', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() =>
          Promise.resolve(userArrayResponse as unknown as Promise<User[]>),
        );

      const result = await controller.findAll();
      expect(result).toEqual(userArrayResponse);
      expect(result[0] instanceof UserEntity).toEqual(true);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('create user', () => {
    it('must return a JSON with two keys, the first is message and the second is user', async () => {
      jest
        .spyOn(service, 'save')
        .mockImplementation(() =>
          Promise.resolve(userResponse as unknown as Promise<User>),
        );
      const result = await controller.create(userInputData);

      expect(result).toHaveProperty(
        'message',
        'User was register successfully',
      );
      expect(result).toHaveProperty('user', userResponse);

      expect(result).toMatchObject({
        message: expect.any(String),
        user: expect.any(UserEntity),
      });
      expect(service.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('find one user', () => {
    it('must return a user of type UserEntity', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(userResponse as unknown as Promise<User>),
        );
      const result = await controller.findOne(user.id);

      expect(result).toEqual(userResponse);
      expect(result instanceof UserEntity).toBe(true);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('must return a error if user is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      await expect(controller.findOne(user.id)).rejects.toThrowError(
        'User not found',
      );
    });
  });

  describe('update a user', () => {
    it('must return a JSON with two keys, the first a message and the second a updated user', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(() =>
          Promise.resolve(userResponse as unknown as Promise<User>),
        );
      const result = await controller.update(1, userInputData);

      expect(result).toHaveProperty('message', 'User was update successfully');
      expect(result).toHaveProperty('user', userResponse);
      expect(result).toMatchObject({
        message: expect.any(String),
        user: expect.any(UserEntity),
      });
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete a user', () => {
    it('must return a  number 1 if user was delete correctly', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementation(() =>
          Promise.resolve(1 as unknown as Promise<number>),
        );
      const result = await controller.remove(1);

      expect(result).toBe(1);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
