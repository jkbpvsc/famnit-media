import { Model, STRING, TEXT } from 'sequelize';

export class Category extends Model { }

export function createCategoryModel(
  sequelize,
) {
  Category.init(
    {
      id: {
        type: STRING(64),
        primaryKey: true,
      },
      name: {
        type: STRING(64),
        allowNull: false,
      },
      slug: {
        type: STRING(64),
        allowNull: false,
        unique: true,
      },
      description: {
        type: TEXT,
        allowNull: true,
      },
      parent_category_id: {
        type: STRING(64),
        allowNull: true,
        references: {
          model: Category,
          key: 'id',
        }
      }
    },
    { sequelize, modelName: 'category' }
  )
}