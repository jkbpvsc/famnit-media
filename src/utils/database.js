import Sequelize from 'sequelize';

export function createDatabaseConnection () {
  return new Sequelize(process.env.DATABASE_URL);
}
