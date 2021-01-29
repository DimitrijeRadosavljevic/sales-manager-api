import { Router } from "express";
import * as productController from "./product.controller";

export const productRouter = new Router();

productRouter.route('/products')
    .post( productController.postProduct )