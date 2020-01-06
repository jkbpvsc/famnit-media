import {BOOLEAN, Model, STRING} from 'sequelize';

export class User extends Model { }

export function createUserModel (
  sequelize
) {
  User.init(
    {
      id: {
        type: STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: STRING(64),
        unique: true,
        allowNull: false,
      },
      password_hash: {
        type: STRING,
        allowNull: false,
      },
      password_salt: {
        type: STRING,
        allowNull: false,
      }
    },
    { sequelize, modelName: 'user' }
  )
}
