import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { UserEntity } from './entities/userEntity';
import { Roles } from 'src/role/decorators/role.decorator';
import { Role } from 'src/role/guards/role.enum';
import { RoleGuard } from 'src/role/guards/role.guard';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.Admin)
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.save(createUserDto);
    const user = plainToInstance(UserEntity, data, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'User was register successfully',
      user,
    };
  }

  @Roles(Role.Admin)
  @Get('all')
  async findAll() {
    const data = await this.usersService.findAll();
    const users = plainToInstance(UserEntity, data, {
      excludeExtraneousValues: true,
    });

    return users;
  }

  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.usersService.findOne(id);
    const user = plainToInstance(UserEntity, data, {
      excludeExtraneousValues: true,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user) {
      return user;
    }
  }

  @Roles(Role.Admin)
  @Post('update/:id')
  async update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.update(id, createUserDto);
    const updatedUser = plainToInstance(UserEntity, data, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'User was update successfully',
      user: updatedUser,
    };
  }

  @Roles(Role.Admin)
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
