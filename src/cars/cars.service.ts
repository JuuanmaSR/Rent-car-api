import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './models/car.model';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
  ) {}

  async save(car: any): Promise<Car> {
    let carModel: Car;
    const buildOptions = { isNewRecord: !car.id };
    carModel = this.carModel.build(car, buildOptions);
    carModel = await carModel.save();
    return carModel;
  }

  async findAll(): Promise<Car[]> {
    return await this.carModel.findAll();
  }

  async findOne(id: number): Promise<Car> {
    return await this.carModel.findByPk(id);
  }

  async update(id: number, car: any): Promise<Car> {
    const updatedCar = car;
    updatedCar.id = id;
    return await this.save(updatedCar);
  }

  async delete(id: number) {
    return await this.carModel.destroy({ where: { id: id } });
  }
}
