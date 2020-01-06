import * as model from "../model_controllers/video";

export async function getVideos (
  req,
  res,
) {
  const data = await model.getAllVideos();

  res.json(data).send()
}

export async function getVideoById (
  req,
  res,
) {
  const id = req.params.id;
  const data = await model.getVideoById(id);

  res.json(data).send();
}

export async function updateVideoById (
  req,
  res
) {
  const id = req.params.id;
  const { title, description, category } = req.body;

  await model.updateVideoById(
    id,
    { title, description, category },
  );

  res.code(200).send();
}

export async function createVideo (
  req,
  res,
) {
  const { title, description, youtube_video_id, category } = req.body;
  await model.createVideo(
    { youtube_video_id, title, description, category },
  );

  res.send(200);
}

export async function deleteVideo (
  req,
  res,
) {
  const id = req.params.id;
  await model.deleteVideoById(id);

  res.code(200).send();
}