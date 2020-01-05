import { createVideoModel } from "./video";

export function initModels(
  sequelize,
) {
  createVideoModel(sequelize);
}
