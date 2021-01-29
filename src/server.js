import express from 'express'
import {json, urlencoded} from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { baseConfig } from "./config";
import { connect } from "./utils/db/db";
import {createHashPassword} from "./utils/auth/auth.service";
import {User} from "./resources/user/user.model";
import authRouter from "./utils/auth/auth.router";
import { Product } from './resources/product/product.model';
import { productRouter } from './resources/product/product.router';

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({extended: true}))
app.use(morgan('dev'))

// app.use('/', (req, res) => {
//   return res.status(200).send("Hello");
// })
app.use(authRouter)
app.use('/api', productRouter);
export const start = async () => {
  try {
    await connect()

    //  await User.create({ email: 'admin@admin.com', password: await createHashPassword('admin')}, (err, data) => {
    //    if(err) console.log(err);

    //    console.log("Data: ", data);
    //  })

    // await Product.create( { name: "ProductName", code: "354354354", color: "orange", dimensions: { height: 154, width: 354}}, (err, productic) => {
    //   if(err) console.log(err)

    //   console.log("Product:", productic);
    // });

    return app.listen(baseConfig.port, () => {
      console.log(`Sales Manager api listening on http://localhost:${baseConfig.port}/api`)

    })
  } catch (error) {
    console.log(error)
  }

}