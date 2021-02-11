import { Router } from "express";
import * as productController from "./product.controller";
const storage = require('../../helpers/storage');

export const productRouter = new Router();

productRouter.route('/products')
    .post( storage, productController.postProduct )
    .get( productController.getProducts )
productRouter.route('/products/:productId')
    .get( productController.getProduct )
    .delete( productController.deleteProduct )
    .put( storage, productController.updateProduct )