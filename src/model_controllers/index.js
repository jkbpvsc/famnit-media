import { join } from 'path';
import { authorize, insertVideo } from "../utils/youtube";

export async function uploadController(
  req,
  res,
) {
  const file = req.file;
  const filePath = join(__dirname, '../../', file.filename);

  const authClient = authorize();
  await insertVideo(
    authClient,
    filePath,
  );
}
