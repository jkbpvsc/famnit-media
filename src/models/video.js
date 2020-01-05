import { Model, STRING } from 'sequelize';

export class Video extends Model { }

export function createVideoModel (
  sequelize
) {
  Video.init(
    {
      id: {
        type: STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      video_id: {
        type: STRING(64),
        allowNull: false,
      },
      title: {
        type: STRING(64),
        allowNull: false,
      },
      description: {
        type: STRING,
        allowNull: true,
      }
    },
    { sequelize, modelName: 'video'}
  );
}
