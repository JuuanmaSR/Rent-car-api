import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from '../cars.controller';
import { CarsModule } from '../cars.module';
import { CarsService } from '../cars.service';
import { CreateCarDto } from '../dto/create-car.dto';
import { CarEntity } from '../entities/car.entity';
import { Car } from '../models/car.model';

const carInputData = {
  brand: 'fiat',
  model: '147',
  year: 1995,
  kilometers: 294567,
  color: 'white',
  airConditioner: false,
  gearbox: 'manual',
  dailyPrice: 2350,
};

const outPutArrayResponse = [
  { ...carInputData, id: 1 },
  { ...carInputData, id: 2 },
];

describe('CarsController', () => {
  let controller: CarsController;
  let service: CarsService;
  const firstCarOutput = {
    id: 1,
    brand: carInputData.brand,
    model: carInputData.model,
    year: carInputData.year,
    kilometers: carInputData.kilometers,
    color: carInputData.color,
    airConditioner: carInputData.airConditioner,
    gearbox: carInputData.gearbox,
    dailyPrice: carInputData.dailyPrice,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CarsModule],
    })
      .overrideProvider(getModelToken(Car))
      .useValue(jest.fn())
      .compile();

    controller = module.get<CarsController>(CarsController);
    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create a car', () => {
    it('must return a JSON with two keys, the first a message, and the second a car ', async () => {
      jest
        .spyOn(service, 'save')
        .mockImplementation(() =>
          Promise.resolve(firstCarOutput as unknown as Promise<Car>),
        );

      const result = await controller.create(carInputData);

      expect(result).toMatchObject({
        message: expect.any(String),
        car: expect.any(CarEntity),
      });
      expect(result).toHaveProperty(
        'message',
        'Car has been created successfully',
      );
      expect(result).toHaveProperty('car', firstCarOutput);
      expect(service.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find all cars', () => {
    it('must return a JSON  with array with CarEntity elements', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() =>
          Promise.resolve(outPutArrayResponse as unknown as Promise<Car[]>),
        );

      const result = await controller.findAll();
      const { cars } = result;

      expect(result).toMatchObject({
        cars: expect.any(Array),
      });
      expect(cars).toHaveLength(2);
      expect(cars[0]).toEqual(outPutArrayResponse[0]);
      expect(cars[1] instanceof CarEntity).toBe(true);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('must return a error message if cars not found', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(null));
      await expect(controller.findAll()).rejects.toThrowError('Cars not found');
    });
  });

  describe('Find a car', () => {
    it('must return a json with a car of CarEntity type', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(firstCarOutput as unknown as Promise<Car>),
        );

      const result = await controller.findOne(firstCarOutput.id);
      const { car } = result;

      expect(car instanceof CarEntity).toEqual(true);
      expect(car).toEqual(firstCarOutput);
      expect(car.id).toEqual(firstCarOutput.id);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('must return a error message if car not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      await expect(controller.findOne(1)).rejects.toThrowError('Car not found');
    });
  });

  describe('Update a car', () => {
    const updatedCar = { ...firstCarOutput, model: 'punto' };
    it('must return a JSON with two keys, the first a message and the second a car of CarEntity type', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(firstCarOutput as unknown as Promise<Car>),
        );
      jest
        .spyOn(service, 'update')
        .mockImplementation(() =>
          Promise.resolve(updatedCar as unknown as Promise<Car>),
        );

      const result = await controller.update(firstCarOutput.id, updatedCar);

      expect(result).toMatchObject({
        message: expect.any(String),
        car: expect.any(CarEntity),
      });
      expect(result).toHaveProperty(
        'message',
        'Car has been updated successfully',
      );
      expect(result).toHaveProperty('car', updatedCar);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('must return a error message if car not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(service, 'update')
        .mockImplementation(() =>
          Promise.resolve(updatedCar as unknown as Promise<Car>),
        );

      await expect(controller.update(2, updatedCar)).rejects.toThrowError(
        'Car not found',
      );
      expect(service.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('Delete a car', () => {
    it('must return a JSON with one key with a message of successfully', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(firstCarOutput as unknown as Promise<Car>),
        );
      jest
        .spyOn(service, 'delete')
        .mockImplementation(() =>
          Promise.resolve(1 as unknown as Promise<number>),
        );

      const result = await controller.delete(firstCarOutput.id);

      expect(result).toMatchObject({
        message: expect.any(String),
      });
      expect(result).toHaveProperty(
        'message',
        'Car has been deleted successfully',
      );
      expect(service.delete).toHaveBeenCalledTimes(1);
    });

    it('must return a message of error if car not found for delete him', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(service, 'delete')
        .mockImplementation(() =>
          Promise.resolve(0 as unknown as Promise<number>),
        );

      await expect(controller.delete(1)).rejects.toThrowError('Car not found');

      expect(service.delete).toHaveBeenCalledTimes(0);
    });

    it("must return a JSON with error message if car is found but the service can't delete him", async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(firstCarOutput as unknown as Promise<Car>),
        );
      jest
        .spyOn(service, 'delete')
        .mockImplementation(() =>
          Promise.resolve(0 as unknown as Promise<number>),
        );

      const result = await controller.delete(firstCarOutput.id);

      expect(result).toMatchObject({
        message: expect.any(String),
      });
      expect(result).toHaveProperty(
        'message',
        "Car hasn't been deleted successfully",
      );
    });
  });
});
