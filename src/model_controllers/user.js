import { User } from '../models/user'
import v4 from 'uuid/v4';

export async function getUserByUsername (
  username
) {
  return User.findOne({ where: { username }});
}

export async function createUser (
  username,
  password_hash,
  password_salt,
  admin,
) {
  await User.create(
    {
      id: v4(),
      username,
      password_hash,
      password_salt,
      admin,
    }
  )
}