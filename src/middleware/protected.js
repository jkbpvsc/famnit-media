import * as jwt from 'jsonwebtoken'

export async function adminRoute(
  req,
  res,
  next,
) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const tokenData = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    res.tokenData = tokenData
    next();
  } catch (e) {
    res.status(401).send();
  }
}
