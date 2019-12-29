import * as jwt from 'jsonwebtoken'
import { SERVER_PRIVATE_KEY } from '../config'

export async function protectedRoute (req, res, next) {
  try {
    const authorizationToken = req.headers.authorization.replace('Bearer ', '')
    const decodedToken = jwt.verify(authorizationToken, SERVER_PRIVATE_KEY);
    req.tokenData = decodedToken;
    next()
  } catch (e) {
    console.log(e)
    res.status(403).json({
      err_code: 'TOKEN_EXPIRED'
    })
  }
}
