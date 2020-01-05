import * as jwt from 'jsonwebtoken'

export async function protectedRoute(
  req,
  res,
  next
) {
  try {
    const authorizationToken = req.headers.authorization.replace('Bearer ', '')

    req.tokenData = jwt.verify(authorizationToken, process.env.JWT_SECRET);
    next()
  } catch (e) {
    res.status(401)
  }
}

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

    if (tokenData.admin === false) {
      res.code(403).send();
      return;
    }

    res.tokenData = tokenData
    next();
  } catch (e) {
    res.status(401).send();
  }
}
