import { createVideoModel } from "./video";
import { createUserModel } from "./user";
import { createCategoryModel } from './category';

export function initModels(
  sequelize,
) {
  createUserModel(sequelize);
  createCategoryModel(sequelize);
  createVideoModel(sequelize);
}
