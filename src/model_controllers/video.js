import {Video} from "../models/video";
import v4 from 'uuid/v4';

export async function createVideo (
  { youtube_video_id, title, description, category }
) {
  return Video.create(
    {
      id: v4(),
      youtube_video_id,
      title,
      description,
      category,
    }
  )
}

export async function getAllVideos() {
  return Video.findAll();
}

export async function getVideoById (
  id
) {
  return Video.findByPk(id);
}

export async function updateVideoById (
  id,
  { title, description, youtube_video_id, category },
) {
  await Video.update(
    {
      title,
      description,
      youtube_video_id,
      category
    }, 
    { where: { id } }
  );
}

export async function deleteVideoById (
  id,
) {
  await Video.destroy(
    { where: { id } }
  );
};

export async function getVideoByCategoryId (
  categoryId,
) {
  return Video.findAll(
    { where: { category: categoryId } }
  )
}