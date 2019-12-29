import { Router } from 'express'
import { verifyToken, getYoutubeAccessToken } from './helpers'
import * as jwt from 'jsonwebtoken'
import { SERVER_PRIVATE_KEY } from '../../config';
import { protectedRoute } from '../../middleware/protected';

const router = Router()

router.post('/token', async (req, res, next) => {
    console.log('started executing token sctipt')
    const { id_token, youtube_api_access_token } = req.body
    try {
        await verifyToken(id_token)
    } catch(e) {
        console.log(e)
        res.status(400).json({
            err_code: 'INVALID_ID_TOKEN' 
        })
        return
    }

    let youtubeTokenData;
    try {
        youtubeTokenData = 
            await getYoutubeAccessToken(youtube_api_access_token)
    } catch(e) {
        console.log(e)
        res.status(400).json({
            err_code: 'INVALID_API_TOKEN' 
        })
        return
    }

    // we allow only admin to access
    /* if(youtubeTokenData.email !== 'famnit') {
        next({ status:404, err_code: 'NO_PERMISSIONS' })
    } */

    const access_token = jwt.sign({ 
        youtube_api: youtube_api_access_token,
        role: 'admin',
        exp: parseInt(youtubeTokenData.data.exp),
        iss: 'famnit-tutorials'
     }, SERVER_PRIVATE_KEY);

     res.status(200).json({
         access_token: access_token,
     })
})

router.post('/verify', protectedRoute ,async (req, res, next) => {
    res.status(200).json({
        valid: true,
    })
})

export default router