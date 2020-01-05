import * as model from "../model_controllers/video";
import {join} from "path";
import * as youtube from "../utils/youtube";
import {unlinkSync} from "fs";

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
  const { title, description } = req.body;

  await model.updateVideoById(
    id,
    { title, description },
  );

  res.code(200).send();
}

export async function createVideo (
  req,
  res,
) {
  const file = req.file;
  const filePath = join(__dirname, '../../temp/', file.filename);
  const accessToken = req.tokenData.youtube_api;

  const response = await youtube.insertVideo(
    accessToken,
    filePath,
    req.body.title,
    req.body.description,
  );

  await model.createVideo(
    { video_id: response.id, title, description },
  );

  unlinkSync(filePath);

  res.send(200);
}
