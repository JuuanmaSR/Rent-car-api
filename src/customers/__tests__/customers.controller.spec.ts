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

const customerArrayOutputData = [
  {
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
  },
  {
    id: 2,
    firstName: 'mili',
    lastName: 'mendoza',
    email: 'example2@gmail.com',
    documentType: 'dni',
    document: '41072667',
    phoneNumber: '03329622382',
    address: 'cucit 45',
    dateOfBirth: new Date('1999-09-16'),
    nationality: 'argentina',
  },
];

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
    it('must return a json with two keys, the first a message and the second a Customer object of CustomerEntity type', async () => {
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

  describe('Find all customers', () => {
    it('must return an array with customers of CustomerEntity type ', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() =>
          Promise.resolve(
            customerArrayOutputData as unknown as Promise<Customer[]>,
          ),
        );

      const result = await controller.findAll();
      expect(result).toHaveProperty('customers');
      expect(result).toMatchObject({
        customers: expect.any(Array),
      });
      expect(result.customers).toHaveLength(2);
      expect(result.customers[0] instanceof CustomerEntity).toEqual(true);
      expect(result.customers[1] instanceof CustomerEntity).toEqual(true);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('must return a error if customers not found', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(null));

      await expect(controller.findAll()).rejects.toThrowError(
        'Customers not found',
      );
    });
  });

  describe('Find a customer', () => {
    it('must return a customer of CustomerEntity type', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(customerOutputData as unknown as Promise<Customer>),
        );

      const result = await controller.findOne(1);
      const { customer } = result;
      expect(customer instanceof CustomerEntity).toEqual(true);
      expect(customer.id).toEqual(1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('must return an error if customer not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      await expect(controller.findOne(1)).rejects.toThrowError(
        'Customer not found',
      );
    });
  });

  describe('Update a customer', () => {
    it('must return a json with two keys, the first a message and the second a Customer object of CustomerEntity type', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(customerOutputData as unknown as Promise<Customer>),
        );
      jest
        .spyOn(service, 'update')
        .mockImplementation(() =>
          Promise.resolve(customerOutputData as unknown as Promise<Customer>),
        );

      const result = await controller.update(1, customerInputData);

      expect(result).toMatchObject({
        message: expect.any(String),
        customer: expect.any(CustomerEntity),
      });
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('must return an error if customer not found ', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      await expect(
        controller.update(1, customerInputData),
      ).rejects.toThrowError('Customer not found');
    });
  });

  describe('Delete a customer', () => {
    it('must return a message if customer has been deleted', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(customerOutputData as unknown as Promise<Customer>),
        );
      jest
        .spyOn(service, 'delete')
        .mockImplementation(() =>
          Promise.resolve(1 as unknown as Promise<number>),
        );

      const result = await controller.delete(1);
      expect(result).toMatchObject({
        message: expect.any(String),
      });
      expect(result).toHaveProperty(
        'message',
        'Customer has been deleted successfully',
      );
      expect(service.delete).toHaveBeenCalledTimes(1);
    });

    it('must return an error  if customer not found for delete him', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      await expect(controller.delete(1)).rejects.toThrowError(
        'Customer not found',
      );
    });

    it("must return an error message if customer is found but the service can't delete him", async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(customerOutputData as unknown as Promise<Customer>),
        );
      jest
        .spyOn(service, 'delete')
        .mockImplementation(() =>
          Promise.resolve(0 as unknown as Promise<number>),
        );

      const result = await controller.delete(1);
      expect(result).toMatchObject({
        message: expect.any(String),
      });
      expect(result).toHaveProperty(
        'message',
        "Customer hasn't been deleted successfully",
      );
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });
});
