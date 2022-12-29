import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password, email } = userObject;
    const emailExist = await this.userService.findByParam({ email });
    if (emailExist) {
      throw new HttpException('Email already exists', HttpStatus.FORBIDDEN);
    }
    const plaintToHash = await hash(password, 10);
    userObject = { ...userObject, password: plaintToHash };
    return await this.userService.save(userObject);
  }

  async login(userObject: LoginAuthDto) {
    const { email, password } = userObject;
    const findUser = await this.userService.findByParam({ email });
    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const validPassword = await compare(password, findUser.password);
    if (!validPassword) {
      throw new HttpException('Password is not valid', HttpStatus.FORBIDDEN);
    }

    const payload = {
      id: findUser.id,
      username: findUser.username,
      password: findUser.password,
      email: findUser.email,
      role: findUser.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
