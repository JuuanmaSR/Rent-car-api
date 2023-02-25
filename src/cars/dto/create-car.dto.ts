import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBooleanString, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  model: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  brand: string;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  year: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  kilometers: number;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  color: string;

  @ApiProperty()
  @IsBooleanString()
  airConditioner: boolean;

  @ApiProperty()
  @IsString()
  gearbox: string;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  dailyPrice: number;
}
