import { respondError, respondSuccess } from "../../helpers/response";
import { productRouter } from "../product/product.router";
import * as orderRepository from "./order.repository";
import *as productRepository from "../product/product.repository";
import { User } from "../user/user.model"

export const getOrders = async (req, res) => {
    const orders = await orderRepository.getOrders(req.user._id, req.query.perPage || 6, req.query.page || 1, req.query.filter || "");
    if(orders.success == true) {
        return respondSuccess(res, orders.data, 200);
    } else {
        return respondError(res, "Error ocured: " + orders.error, 500);
    }
}

export const postOrder = async (req, res) => {

    const chartItems = req.body.chartItems;
    chartItems.forEach( async chartItem => {
        const product = await productRepository.updateProductQuantity(chartItem._id, chartItem.newProductQuantity);
        if(product.success == false) {
            return respondError(res, "Error ocured: " + product.error, 500)
        }
    });
    const user = await User.findById(req.user._id);

    const order = await orderRepository.postOrder(user, req.body);
    if(order.success == true) {
        return respondSuccess(res, order.data, 201);
    } else {
        return respondError(res, "Error ocured: " + order.error, 500);
    }
}

export const getOrder = async (req, res) => {

    //const user = await User.findById(req.user._id);

    //TODO Sheck does user own order

    const order = await orderRepository.getOrder(req.params.orderId);
    if(order.success == true) {
        return respondSuccess(res, order.data, 200);
    } else {
        return respondError(res, "Error ocured: " + productRouter.error, 500);
    }
}

export const getSellerOrders = async (req, res) => {
    console.log("Orders" + req.user._id);
    const orders = await orderRepository.getSellerOrders(req.user._id, req.query.perPage || 6, req.query.page || 1, req.query.filter || "");
    if(orders.success == true) {
        return respondSuccess(res, orders.data, 200);
    } else {
        return respondError(res, "Error ocured: " + orders.error, 500);
    }
}

export const updateOrderStatus = async (req, res) => {

    console.log(req.body);
    const order = await orderRepository.updateOrderStatus(req.params.orderId, req.body);
    if(order.success == true) {
        return respondSuccess(res, order.data, 201);
    } else {
        return respondError(res, "Error ocured: " + productRouter.error, 500);
    }
}