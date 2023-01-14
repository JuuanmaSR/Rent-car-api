import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBooleanString, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
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
  color: string;

  @ApiProperty()
  @IsBooleanString()
  //   @Transform(({ value }) => {
  //     if (value === 'true') {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  airConditioner: boolean;

  @ApiProperty()
  @IsString()
  gearbox: string;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  dailyPrice: number;
}
