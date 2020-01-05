import * as jwt from 'jsonwebtoken'

export async function protectedRoute (req, res, next) {
  try {
    if (req.headers.authorization) {
      const authorizationToken = req.headers.authorization.replace('Bearer ', '')

      req.tokenData = jwt.verify(authorizationToken, process.env.SERVER_PRIVATE_KEY);
      next()
    } else {
      throw new Error('MISSING AUTH HEADER')
    }
  } catch (e) {
    res.status(403)
  }
}
