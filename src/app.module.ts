import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';

import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/models/customer.model';

import { CarsModule } from './cars/cars.module';
import { Car } from './cars/models/car.model';


@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: config.get('database.dialect'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.user'),
        password: config.get('database.password'),
        database: config.get('database.name'),
        models: [User, Customer, Car],
        autoLoadModels: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
    CustomersModule,
    CarsModule,
  ],
})
export class AppModule { }
