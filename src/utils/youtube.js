import { google } from 'googleapis';
import googleauth from 'google-auth-library';
import { lookup } from 'mime';
import { createReadStream } from 'fs'

const youtube = google.youtube();

const SCOPES = [ 'https://www.googleapis.com/auth/youtube.upload' ]


export async function authorize() {
  const credentials = require('../../google-credentials');
  return new google.auth.GoogleAuth(
    {
      scopes: SCOPES,
      credentials
    }
  );
}

export async function insertVideo (
  authClient,
  videoPath,
) {
  const videoStream = createReadStream(videoPath);
  const mimeType = lookup(videoPath);

  const response = await youtube.video.insert(
    {
      auth: authClient,
      requestBody: {},
      media: {
        mimeType,
        body: videoStream,
      }
    }
  )
}
