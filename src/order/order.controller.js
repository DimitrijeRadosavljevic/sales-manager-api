import { respondError, respondSuccess } from "../helpers/response";
import { productRouter } from "../resources/product/product.router";
import * as orderRepository from "./order.repository"

export const getOrders = async (req, res) => {
    const orders = await orderRepository.getOrders(req.user._id);
    if(orders.success) {
        return respondSuccess(res, orders.data, 200);
    } else {
        return respondError(res, "Error ocured: " + orders.error, 500);
    }
}

export const postOrder = async (req, res) => {
    const order = await orderRepository.postOrder(req.user._id, req.body);
    if(order.success) {
        return respondSuccess(res, order.data, 200);
    } else {
        return respondError(res, "Error ocured: " + productRouter.error, 500);
    }
}