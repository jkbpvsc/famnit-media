import * as axios from 'axios';

export async function verifyToken(token) {
  return axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
}

export async function getYoutubeAccessToken(access_token) {
  const baseUrl = process.env.GOOGLE_OAUTH_BASE_URI;
  return axios.get(`${baseUrl}tokeninfo?access_token=${access_token}`)
}
