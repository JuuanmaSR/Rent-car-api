import { UsersService } from '../users.service';
import { User } from '../models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { createMemDb } from 'src/utils/testing-helpers/createMemDb';

describe('UserService', () => {
  let service: UsersService;
  let memoryDb: Sequelize;

  beforeAll(async () => {
    memoryDb = await createMemDb([User]);
    service = new UsersService(User);
  });
  afterAll(async () => await memoryDb.close());

  describe('find users', () => {
    let firstUser: User;
    let secondUser: User;

    beforeEach(async () => {
      firstUser = await User.create({
        id: 1,
        username: 'juanma',
        password: 'asdasdasd',
        email: 'example1@gmail.com',
      });
      secondUser = await User.create({
        id: 2,
        username: 'mili',
        password: 'asdasdasd2',
        email: 'example2@gmail.com',
      });
    });
    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return an array with users', async () => {
      const result = await service.findAll();
      expect(result).toHaveLength(2);
      expect(result[0] instanceof User).toEqual(true);
      expect(result[1] instanceof User).toEqual(true);
      expect(result[0].id).toEqual(firstUser.id);
      expect(result[1].id).toEqual(secondUser.id);
    });
  });

  describe('find a user', () => {
    let user: User;
    beforeEach(async () => {
      user = await User.create({
        id: 1,
        username: 'juanma',
        password: 'asdasdasd',
        email: 'example@gmail.com',
      });
    });
    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return a user instance of User model', async () => {
      const result = await service.findOne(1);
      expect(result instanceof User).toEqual(true);
      expect(result.id).toEqual(user.id);
    });

    it('must return null if user not found', async () => {
      const result = await service.findOne(2);
      expect(result).toBeNull();
    });
  });

  describe('find a user by param', () => {
    let user: User;
    beforeEach(async () => {
      user = await User.create({
        id: 1,
        username: 'juanma',
        password: 'asdasdasd',
        email: 'example@gmail.com',
      });
    });
    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return a user instance of User model', async () => {
      const result = await service.findByParam({ email: user.email });
      expect(result instanceof User).toEqual(true);
      expect(result.dataValues).toEqual(user.dataValues);
    });

    it('must return a null if user not found', async () => {
      const result = await service.findByParam({
        email: 'wrongemail@gmail.com',
      });
      expect(result).toBeNull();
    });
  });

  describe('update a user', () => {
    let user: User;
    beforeEach(async () => {
      user = await User.create({
        id: 1,
        username: 'juanma',
        password: 'asdasdasd',
        email: 'example@gmail.com',
      });
    });
    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return a updated user', async () => {
      const result = await service.update(user.id, {
        username: 'juanmariafernandez',
        password: 'newpassword',
        email: 'example2@gmail.com',
      });

      expect(result instanceof User).toEqual(true);
      expect(result.id).toEqual(user.id);
      expect(result).toMatchObject({
        id: 1,
        username: 'juanmariafernandez',
        password: 'newpassword',
        email: 'example2@gmail.com',
      });
    });
  });

  describe('save a user', () => {
    afterEach(async () => {
      await memoryDb.truncate();
    });
    const user = {
      username: 'juanmariafernandez',
      password: 'newpassword',
      email: 'example2@gmail.com',
    };

    it('must return a saved user', async () => {
      const result = await service.save(user);
      expect(result instanceof User).toEqual(true);
      expect(result.id).toBeDefined();
      expect(result).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        password: expect.any(String),
        email: expect.any(String),
      });
    });
  });

  describe('remove a user', () => {
    let user;
    beforeEach(async () => {
      user = await User.create({
        id: 1,
        username: 'juanma',
        password: 'asdasdasd',
        email: 'example@gmail.com',
      });
    });

    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return  1 if user was deleted', async () => {
      const isDeleted = await service.remove(user.id);
      expect(isDeleted).toEqual(1);
    });

    it('must return 0 if user not was deleted', async () => {
      const isDeleted = await service.remove(2);
      expect(isDeleted).toBe(0);
    });
  });
});
