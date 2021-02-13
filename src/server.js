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

export const start = async () => {
  try {
    await connect()

    //  await User.create({ email: 'admin@admin.com', password: await createHashPassword('admin')}, (err, data) => {
    //    if(err) console.log(err);

    //    console.log("Data: ", data);
    //  })

    // await Product.paginate( { name: "ProductName", code: "354354354", color: "orange", dimensions: { height: 154, width: 354}}, (err, productic) => {
    //   if(err) console.log(err)

    //   console.log("Product:", productic);
    // });

    //await Product.create( {}).then(data => {} ).catch(err => { })

    // const orderForCreate = { ...{ userDetail: {name: "Name", lastName: "LastName", email: "email@gmail.com"}, cardItems: [{name: "name", code: "354354354", staffSalePrice: 354, dimensions: {x: 354, y: 354, z: 354}, quantity: 15}], amount: 354, status: true}, createdBy: mongoose.mongo.ObjectId("6022cf256ff8642ca0901a65"), ownerId: mongoose.mongo.ObjectId("6022cf256ff8642ca0901a65") };
    // await Order.create(orderForCreate)

    return app.listen(baseConfig.port, () => {
      console.log(`Sales Manager api listening on http://localhost:${baseConfig.port}/api`)

    })
  } catch (error) {
    console.log(error)
  }

}
