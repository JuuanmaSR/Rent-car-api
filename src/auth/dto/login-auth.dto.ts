import { IsEmail, Length } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @Length(4, 20)
  password: string;
}
