import { Expose } from 'class-transformer';

export class CustomerEntity {
  @Expose()
  id: number;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  email: string;
  @Expose()
  documentType: string;
  @Expose()
  document: string;
  @Expose()
  phoneNumber: string;
  @Expose()
  address: string;
  @Expose()
  dateOfBirth: string;
  @Expose()
  nationality: string;
}
