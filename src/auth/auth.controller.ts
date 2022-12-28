import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { plainToClass } from 'class-transformer';
import { AuthEntity } from './entities/auth.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userObjectRegister: RegisterAuthDto) {
    const userRegister = await this.authService.register(userObjectRegister);
    const user = plainToClass(AuthEntity, userRegister, {
      excludeExtraneousValues: true,
    });
    return user;
  }

  @Post('login')
  login(@Body() userObjectLogin: LoginAuthDto) {
    return this.authService.login(userObjectLogin);
  }
}
