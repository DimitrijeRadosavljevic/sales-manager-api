import express from 'express'
import {json, urlencoded} from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { baseConfig } from "./config";
import { connect } from "./utils/db/db";
import {createHashPassword} from "./utils/auth/auth.service";
import {User} from "./resources/user/user.model";
import authRouter from "./utils/auth/auth.router";

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(authRouter)

export const start = async () => {
  try {
    await connect()

    // await User.create({ email: 'admin@admin.com', password: await createHashPassword('admin')})

    return app.listen(baseConfig.port, () => {
      console.log(`Sales Manager api listening on http://localhost:${baseConfig.port}/api`)

    })
  } catch (error) {
    console.log(error)
  }

}
