import { respondError, respondSuccess } from "../../helpers/response";
import { productRouter } from "../product/product.router";
import * as orderRepository from "./order.repository"
import { User } from "../user/user.model"

export const getOrders = async (req, res) => {
    const orders = await orderRepository.getOrders(req.user._id);
    if(orders.success == true) {
        return respondSuccess(res, orders.data, 200);
    } else {
        return respondError(res, "Error ocured: " + orders.error, 500);
    }
}

export const postOrder = async (req, res) => {

    const user = await User.findById(req.user._id);

    const order = await orderRepository.postOrder(user, req.body);
    if(order.success == true) {
        return respondSuccess(res, order.data, 200);
    } else {
        return respondError(res, "Error ocured: " + productRouter.error, 500);
    }
}