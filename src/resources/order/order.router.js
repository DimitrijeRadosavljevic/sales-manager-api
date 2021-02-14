import { Router } from "express";
import * as orderController from "./order.controller"

export const orderRouter = new Router();

orderRouter.route('/orders')
    .get( orderController.getOrders )
    .post( orderController.postOrder )
orderRouter.route('/orders/seller')
    .get( orderController.getSellerOrders )
orderRouter.route('/orders/:orderId')
    .get( orderController.getOrder )