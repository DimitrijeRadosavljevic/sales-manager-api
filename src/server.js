import express from 'express'
import {json, urlencoded} from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { baseConfig } from "./config";
import { connect } from "./utils/db/db";

import authRouter from "./utils/auth/auth.router";
import { productRouter } from './resources/product/product.router';
import { userRouter } from "./resources/user/user.router";
import { orderRouter } from "./resources/order/order.router";
import { Order } from"./resources/order/order.model"

import mongoose from 'mongoose';
import { reportRouter } from './resources/report/report.router';

const path = require('path');

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({extended: true}))
app.use(morgan('dev'))
app.use('/product_images', express.static(path.join('storage/app/product_images')))


app.use(authRouter)
app.use('/api', userRouter)
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', reportRouter);

export const start = async () => {
  try {

    await connect()
    return app.listen(baseConfig.port, () => {
      console.log(`Sales Manager api listening on http://localhost:${baseConfig.port}/api`)
    })
  } catch (error) {
    console.log(error)
  }

}
