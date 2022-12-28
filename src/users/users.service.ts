import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async save(user: any): Promise<User> {
    let userModel: User;
    const buildOptions = { isNewRecord: !user.id };
    userModel = this.userModel.build(user, buildOptions);
    userModel = await userModel.save();
    return userModel;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findByPk(id);
  }

  async findByParam(param: any) {
    return await this.userModel.findOne({ where: param });
  }

  async update(id: number, user) {
    const updateUser = user;
    updateUser.id = id;
    return await this.save(updateUser);
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id: id } });
  }
}
