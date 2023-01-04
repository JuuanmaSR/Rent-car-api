import { ModelCtor, Sequelize } from 'sequelize-typescript';

export async function createMemDb(models: ModelCtor[]) {
  const memoryDb = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  memoryDb.addModels(models);

  await memoryDb.sync();
  return memoryDb;
}
