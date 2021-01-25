import { baseConfig } from '../../config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const newToken = user => {
  return jwt.sign({id: user.id}, baseConfig.secrets.jwt, {
    expiresIn: baseConfig.secrets.jwtExp
  })
}

export const verifyToken = async token => {
  const result = await jwt.verify(token, baseConfig.secrets.jwt)
  return result
}

export const checkPassword = async (password, passwordHash) => {

  const result = await bcrypt.compare(password, passwordHash)
  return result
}

export const createHashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 8)
  return hashPassword;
}

