import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  firstName: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
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
  @Transform(({ value }) => value.toLowerCase())
  address: string;

  @ApiProperty()
  @IsString()
  dateOfBirth: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  nationality: string;
}
