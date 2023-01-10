import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { Roles } from 'src/role/decorators/role.decorator';
import { Role } from 'src/role/guards/role.enum';
import { RoleGuard } from 'src/role/guards/role.guard';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customerEntity';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('create')
  async create(@Body() customerData: CreateCustomerDto) {
    const data = await this.customersService.save(customerData);
    const customer = plainToInstance(CustomerEntity, data, {
      excludeExtraneousValues: true,
    });
    return {
      message: 'Customer has been created successfully',
      customer,
    };
  }

  @Get('all')
  async findAll() {
    const data = await this.customersService.findAll();
    const customers = plainToInstance(CustomerEntity, data, {
      excludeExtraneousValues: true,
    });

    if (!customers) {
      throw new HttpException('Customers not found', HttpStatus.NOT_FOUND);
    }

    return { customers };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.customersService.findOne(id);
    const customer = plainToInstance(CustomerEntity, data, {
      excludeExtraneousValues: true,
    });

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    return { customer };
  }

  @Post('update/:id')
  async update(
    @Param('id') id: number,
    @Body() customerData: UpdateCustomerDto,
  ) {
    const customerExist = await this.customersService.findOne(id);
    if (!customerExist) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    const data = await this.customersService.update(id, customerData);
    const customer = plainToInstance(CustomerEntity, data, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'Customer has been updated sucessfully',
      customer,
    };
  }

  @Get('delete/:id')
  async delete(@Param('id') id: number) {
    const customerExist = await this.customersService.findOne(id);
    if (!customerExist) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    const isDeleted = await this.customersService.delete(id);

    return isDeleted
      ? { message: 'Customer has been deleted successfully' }
      : { message: "Customer hasn't been deleted successfully" };
  }
}
