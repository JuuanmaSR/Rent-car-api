import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @Length(4, 20)
  username: string;
}
