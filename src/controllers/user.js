import { getUserByUsername, createUser } from "../model_controllers/user";
import { hashSync, genSaltSync } from 'bcrypt'
import { sign } from 'jsonwebtoken';

const SALT_ROUNDS = 10000;

export async function login (
  req,
  res
) {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);

  const hashedPassword = hashSync(password, user.password_salt);
  if (hashedPassword !== user.password_hash) {
    res
    .code(403)
    .send();
    return;
  }

  const accessToken = sign(
    { username, id: user.id },
    process.env.JWT_SECRET
  )

  res.json({ access_token: accessToken }).send();
}

export async function addUser (
  req,
  res,
) {
  const { 
    username,
    password,
  } = req.body;

  const salt = genSaltSync(SALT_ROUNDS);
  const hashedPassword = hashSync(password, salt);

  await createUser(
    username,
    hashedPassword,
    salt,
  );

  res.code(200).send();
}