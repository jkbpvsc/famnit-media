import { Model, STRING } from 'sequelize';
import { Category } from './category';

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
      youtube_video_id: {
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
      },
      category: {
        type: STRING(64),
        references: {
          model: Category,
          key: 'id',
        }
      }
    },
    { sequelize, modelName: 'video'}
  );
}
