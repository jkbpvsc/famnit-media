import {Video} from "../models/video";
import v4 from 'uuid/v4';

export async function createVideo (
  { youtube_video_id, title, description }
) {
  return Video.create(
    {
      id: v4(),
      youtube_video_id,
      title,
      description,
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
  { title, description, youtube_video_id },
) {
  return Video.update(
    {
      id,
      title,
      description,
      youtube_video_id,
    }
  )
}
