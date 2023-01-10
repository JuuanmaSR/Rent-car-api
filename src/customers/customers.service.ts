import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
  ) {}

  async save(customer: any): Promise<Customer> {
    let customerModel: Customer;
    const buildOptions = { isNewRecord: !customer.id };
    customerModel = this.customerModel.build(customer, buildOptions);
    customerModel = await customerModel.save();
    return customerModel;
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customerModel.findByPk(id);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerModel.findAll();
  }

  async update(id: number, customer: any): Promise<Customer> {
    const updatedCustomer = customer;
    updatedCustomer.id = id;
    return await this.save(updatedCustomer);
  }

  async delete(id: number): Promise<number> {
    return await this.customerModel.destroy({ where: { id: id } });
  }
}
