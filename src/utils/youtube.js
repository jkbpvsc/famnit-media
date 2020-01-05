import { google } from 'googleapis';
import googleauth from 'google-auth-library';
import mime  from 'mime';
import { createReadStream } from 'fs'

const youtube = google.youtube('v3');

const authClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL,
)

export async function insertVideo (
  accessToken,
  videoPath,
  title,
  description,
) {

  authClient.setCredentials({ access_token: accessToken });

  const videoStream = createReadStream(videoPath);
  const mimeType = 'application/octet-stream';

  const response = await youtube.videos.insert(
    {
      auth: authClient,
      requestBody: {
        snippet: {
          title,
          description,
        },
        status: {
          privacyStatus: 'private'
        }
      },
      part: 'snippet,status',
      media: {
        mimeType,
        body: videoStream,
      }
    }
  );

  return response.data;
}
