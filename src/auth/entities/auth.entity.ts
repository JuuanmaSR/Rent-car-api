import { Expose, Exclude } from 'class-transformer';

export class AuthEntity {
  id: number;
  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  email: string;
}
