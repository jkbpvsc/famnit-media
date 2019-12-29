import { GOOGLE_OAUTH_BASE_URI } from '../../config';
import * as axios from 'axios';

export async function verifyToken(token) {
  return axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
}

export async function getYoutubeAccessToken(access_token) {
  console.log(`${GOOGLE_OAUTH_BASE_URI}tokeninfo?access_token=${access_token}`)
    return axios.get(`${GOOGLE_OAUTH_BASE_URI}tokeninfo?access_token=${access_token}`)
}