import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  id: number;
  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  email: string;
}
