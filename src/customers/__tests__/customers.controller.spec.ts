import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../customers.controller';
import { CustomersModule } from '../customers.module';
import { CustomersService } from '../customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerEntity } from '../entities/customerEntity';
import { Customer } from '../models/customer.model';

const customerOutputData = {
  id: 1,
  firstName: 'juanma',
  lastName: 'fernandez',
  email: 'example@gmail.com',
  documentType: 'dni',
  document: '41072689',
  phoneNumber: '03329622082',
  address: 'calle 62 1014',
  dateOfBirth: new Date('1998-04-17'),
  nationality: 'argentina',
};

const customerInputData: CreateCustomerDto = {
  firstName: customerOutputData.firstName,
  lastName: customerOutputData.lastName,
  email: customerOutputData.email,
  documentType: customerOutputData.documentType,
  document: customerOutputData.document,
  phoneNumber: customerOutputData.phoneNumber,
  address: customerOutputData.address,
  dateOfBirth: customerOutputData.dateOfBirth,
  nationality: customerOutputData.nationality,
};

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomersModule],
    })
      .overrideProvider(getModelToken(Customer))
      .useValue(jest.fn())
      .compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create a customer', () => {
    it('must return a json with two keys, the first a message and the second a Customer object of type CustomerEntity', async () => {
      jest
        .spyOn(service, 'save')
        .mockImplementation(() =>
          Promise.resolve(customerOutputData as unknown as Promise<Customer>),
        );
      const result = await controller.create(customerInputData);

      expect(result).toHaveProperty(
        'message',
        'Customer has been created successfully',
      );
      expect(result).toHaveProperty('customer', customerOutputData);
      expect(result).toMatchObject({
        message: expect.any(String),
        customer: expect.any(CustomerEntity),
      });
      expect(service.save).toHaveBeenCalledTimes(1);
    });
  });
});
