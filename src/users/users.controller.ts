import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { plainToClass } from 'class-transformer';
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
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.save(createUserDto);
    res.json({
      message: 'User was register succesfully',
      user,
    });
  }
  @Roles(Role.Admin)
  @Get('all')
  async findAll(@Res() res) {
    const users = await this.usersService.findAll();
    res.json(users);
  }

  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const data = await this.usersService.findOne(+id);
    const user = plainToClass(UserEntity, data, {
      excludeExtraneousValues: true,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user) {
      res.json(user);
    }
  }

  @Roles(Role.Admin)
  @Post('update/:id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    const updatedUser = await this.usersService.update(+id, createUserDto);
    res.json({
      message: 'The user was updated succesfully',
      user: updatedUser,
    });
  }

  @Roles(Role.Admin)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
