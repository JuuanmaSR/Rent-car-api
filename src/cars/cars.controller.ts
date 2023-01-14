import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/role/decorators/role.decorator';
import { Role } from 'src/role/guards/role.enum';
import { RoleGuard } from 'src/role/guards/role.guard';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from './entities/car.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Roles(Role.Admin)
  @Post('create')
  async create(@Body() createCarDto: CreateCarDto) {
    const data = await this.carsService.save(createCarDto);
    const car = plainToInstance(CarEntity, data, {
      excludeExtraneousValues: true,
    });
    return {
      message: 'Car has been created successfully',
      car,
    };
  }
  @Roles(Role.Admin)
  @Get('all')
  async findAll() {
    const data = await this.carsService.findAll();
    const cars = plainToInstance(CarEntity, data, {
      excludeExtraneousValues: true,
    });

    if (!cars) {
      throw new HttpException('Cars not found', HttpStatus.NOT_FOUND);
    }

    return { cars };
  }

  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.carsService.findOne(id);
    const car = plainToInstance(CarEntity, data, {
      excludeExtraneousValues: true,
    });

    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return { car };
  }

  @Roles(Role.Admin)
  @Post('update/:id')
  async update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    const data = await this.carsService.update(id, updateCarDto);
    const car = plainToInstance(CarEntity, data, {
      excludeExtraneousValues: true,
    });
    return {
      message: 'Car has been updated successfully',
      car,
    };
  }

  @Roles(Role.Admin)
  @Get('delete/:id')
  async delete(@Param('id') id: number) {
    const carExist = await this.carsService.findOne(id);
    if (!carExist) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
    const isDeleted = await this.carsService.delete(id);

    return isDeleted
      ? { message: 'Car has been deleted successfully' }
      : { message: "Car hasn't been deleted successfully" };
  }
}
