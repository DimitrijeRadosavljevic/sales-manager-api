import mongoose from 'mongoose'
import { baseConfig } from "../../config";

export const connect = (url = baseConfig.dbUrl, opts = {}) => {
  return mongoose.connect(
    url,
    { ...opts, useNewUrlParser: true, useUnifiedTopology: true }
  )
}
