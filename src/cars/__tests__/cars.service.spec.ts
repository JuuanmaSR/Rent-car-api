import { Sequelize } from 'sequelize-typescript';
import { CarsService } from '../cars.service';
import { Car } from '../models/car.model';
import { createMemDb } from '../../utils/testing-helpers/createMemDb';

const firstCar = {
  brand: 'fiat',
  model: '147',
  kilometers: 295000,
  year: 1995,
  color: 'white',
  airConditioner: true,
  gearbox: 'manual',
  dailyPrice: 2500,
};

describe('CarsService', () => {
  let service: CarsService;
  let memoryDb: Sequelize;
  beforeEach(async () => {
    memoryDb = await createMemDb([Car]);
    service = new CarsService(Car);
  });

  afterAll(async () => {
    await memoryDb.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Save a car', () => {
    afterEach(async () => {
      await memoryDb.truncate();
    });
    it('must return a car of model type', async () => {
      const result = await service.save(firstCar);
      const { dataValues: car } = result;
      expect(result instanceof Car).toEqual(true);
      expect(car).toBeDefined();
      expect(car.id).toEqual(1);
    });
  });

  describe('Find all cars', () => {
    let firstInputCar = { ...firstCar };
    let secondInputCar = { ...firstCar, model: 'punto' };
    beforeEach(async () => {
      firstInputCar = await Car.create(firstInputCar);
      secondInputCar = await Car.create(secondInputCar);
    });
    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return an array with cars of model type', async () => {
      const result = await service.findAll();
      expect(result).toHaveLength(2);
      expect(result[0] instanceof Car).toEqual(true);
      expect(result[1] instanceof Car).toEqual(true);
      expect(result[0].id).toEqual(1);
      expect(result[1].id).toEqual(2);
    });
  });

  describe('Find a car', () => {
    let firstInputCar;
    beforeEach(async () => {
      firstInputCar = await Car.create(firstCar);
    });
    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return a car of model type', async () => {
      const result = await service.findOne(1);
      const { dataValues: car } = result;
      expect(result instanceof Car).toEqual(true);
      expect(car).toBeDefined();
    });
  });

  describe('Update a car', () => {
    let firstInputCar;
    const updatedCar = { ...firstCar, model: 'punto' };
    beforeEach(async () => {
      firstInputCar = await Car.create(firstCar);
    });

    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return a updated car of model type', async () => {
      const result = await service.update(firstInputCar.id, updatedCar);
      const { dataValues: car } = result;
      expect(result instanceof Car).toEqual(true);
      expect(car).not.toEqual(firstInputCar);
      expect(car).toHaveProperty('model', 'punto');
    });
  });

  describe('', () => {
    let firstInputCar;
    beforeEach(async () => {
      firstInputCar = await Car.create(firstCar);
    });
    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return number 1 if car has been deleted successfully', async () => {
      const result = await service.delete(firstInputCar.id);
      expect(result).toBe(1);
    });
    it("must return 0 if car hasn't been deleted successfully", async () => {
      const result = await service.delete(2);
      expect(result).toBe(0);
    });
  });
});
