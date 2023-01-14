import { Expose } from 'class-transformer';

export class CarEntity {
  @Expose()
  id: number;

  @Expose()
  model: string;

  @Expose()
  brand: string;

  @Expose()
  year: number;

  @Expose()
  kilometers: number;

  @Expose()
  color: string;

  @Expose()
  airConditioner: boolean;

  @Expose()
  gearbox: string;

  @Expose()
  dailyPrice: number;
}
