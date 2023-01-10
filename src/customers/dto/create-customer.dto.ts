import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsDate } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  documentType: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateOfBirth: Date;

  @ApiProperty()
  @IsString()
  nationality: string;
}
