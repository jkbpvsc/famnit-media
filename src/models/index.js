import { createVideoModel } from "./video";
import {createUserModel} from "./user";

export function initModels(
  sequelize,
) {
  createVideoModel(sequelize);
  createUserModel(sequelize);
}
