import { CarsService } from '../cars.service';
import { Car } from '../models/car.model';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    service = new CarsService(Car);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
