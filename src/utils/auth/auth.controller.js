import { newToken, verifyToken, checkPassword } from "./auth.service";
import { respondError } from "../../helpers/response";
import { validationResult } from "express-validator";
import { User } from "../../resources/user/user.model";

const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    respondError(res, errors.array(), 400)
  }
  const email = req.body.email

  try {
    const user = await User.findOne({ email: email })
      .select('email password')
      .exec()

    if (!user) {
      return respondError(res, null, 401)
    }

    const match = await checkPassword(req.body.password, user.password)

    if (!match) {
      return respondError(res, null, 401)
    }

    const token = newToken(user)
    return res.status(201).send({ token, data: user })
  } catch (error) {
    console.log(error)
    return respondError(res, null, 500)
  }
}

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) return res.status(401).end()
  let token = bearer.split('Bearer ')[1]
  if (!token) return respondError(res, null, 401)
  let payload
  try {
    payload = await verifyToken(token);
  } catch (error) {
    return respondError(res, null, 401)
  }

  const user = await User.findById( payload.id )
    .select('email password')
    .exec()

  req.user = user;
  next()
}

const identify = async (req, res) => {
  return res.status(200).send({ data: req.user });
}

const loginValidate = {
  email: {
    in: ['body'],
    isLength: {
      errorMessage: 'Email required',
      options: { min: 1 }
    },
    isEmail: {
      errorMessage: 'Email wrong format',
    }
  },
  password: {
    in: ['body'],
    isLength: {
      errorMessage: 'Password required',
      options: { min: 1 }
    }
  },
}

export const authController = {
  login,
  protect,
  identify,

  loginValidate
}
