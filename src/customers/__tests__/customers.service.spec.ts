import { Sequelize } from 'sequelize-typescript';
import { CustomersService } from '../customers.service';
import { createMemDb } from '../../utils/testing-helpers/createMemDb';
import { Customer } from '../models/customer.model';

const customerInput = {
  id: 1,
  firstName: 'juanma',
  lastName: 'fernandez',
  email: 'example@gmail.com',
  documentType: 'dni',
  document: '41072689',
  phoneNumber: '03329622082',
  address: 'calle 62 1014',
  dateOfBirth: String(new Date('1998-04-17')),
  nationality: 'argentina',
};

describe('CustomersService', () => {
  let service: CustomersService;
  let memoryDb: Sequelize;

  beforeAll(async () => {
    memoryDb = await createMemDb([Customer]);
    service = new CustomersService(Customer);
  });

  afterAll(() => memoryDb.close());

  describe('create a customer', () => {
    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return a save customer of model type', async () => {
      const result = await service.save(customerInput);
      const { dataValues: customer } = result;
      expect(result instanceof Customer).toEqual(true);
      expect(customer).toBeDefined();
      expect(customer.id).toEqual(1);
    });
  });

  describe('find a customer', () => {
    let firstCustomer: Customer;

    beforeEach(async () => {
      firstCustomer = await Customer.create(customerInput);
    });

    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return a customer with specific id', async () => {
      const result = await service.findOne(1);
      const { dataValues: customer } = result;
      expect(result instanceof Customer).toEqual(true);
      expect(customer).toBeDefined();
      expect(customer).toEqual(firstCustomer.dataValues);
      expect(customer.id).toEqual(firstCustomer.id);
    });

    it('must return null if customer not found', async () => {
      const result = await service.findOne(2);

      expect(result).toBeNull();
    });
  });

  describe('find all customers', () => {
    let firstCustomer: Customer;
    let secondCustomer: Customer;

    beforeEach(async () => {
      firstCustomer = await Customer.create(customerInput);
      secondCustomer = await Customer.create({
        id: 2,
        firstName: 'juanma',
        lastName: 'fernandez',
        email: 'example@gmail.com',
        documentType: 'dni',
        document: '41072680',
        phoneNumber: '03329622082',
        address: 'calle 62 1014',
        dateOfBirth: String(new Date('1998-04-17')),
        nationality: 'argentina',
      });
    });

    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return an array of customers models', async () => {
      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result.every((e) => e instanceof Customer)).toBeTruthy();
    });
  });

  describe('update a customer', () => {
    let firstCustomer: Customer;
    beforeEach(async () => {
      firstCustomer = await Customer.create(customerInput);
    });

    afterEach(async () => {
      memoryDb.truncate();
    });

    it('must return an updated customer model', async () => {
      const result = await service.update(firstCustomer.id, {
        firstName: 'juanmaria',
        lastName: 'fernandez',
        email: 'example@gmail.com',
        documentType: 'dni',
        document: '41072689',
        phoneNumber: '03329622082',
        address: 'calle 62 1014',
        dateOfBirth: String(new Date('1998-04-17')),
        nationality: 'argentina',
      });
      const { dataValues: customer } = result;

      expect(result instanceof Customer).toEqual(true);
      expect(customer.id).toEqual(customerInput.id);
      expect(customer).toHaveProperty('firstName', 'juanmaria');
    });
  });

  describe('Delete a customer', () => {
    let firstCustomer: Customer;
    beforeEach(async () => {
      firstCustomer = await Customer.create(customerInput);
    });
    afterEach(async () => {
      await memoryDb.truncate();
    });

    it('must return a number 1 if user has been deleted successfully', async () => {
      const result = await service.delete(firstCustomer.id);
      expect(result).toBe(1);
    });
    it("must return a number 0 if user hasn't been deleted", async () => {
      const result = await service.delete(2);
      expect(result).toBe(0);
    });
  });
});
