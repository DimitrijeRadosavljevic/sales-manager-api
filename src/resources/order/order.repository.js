import mongoose from "mongoose";
import { Order } from "./order.model";


export const getOrders = async (userId, perPage, page) => {

    let skip = (page - 1) * perPage;
    return await Order.paginate({ownerId: mongoose.mongo.ObjectId(userId)}, {offset: skip, limit: +perPage}).then(orders => {
        if(orders.docs) {
            return {success: true, data: { orders: orders.docs, total: orders.total } }
        } else {
            return {success: true, data: [] }
        }
    }).catch(err => {
        return {success: false, error: err}
    })
}

export const postOrder = async (user, order) => {
    const orderForCreate = { ...order, createdBy: mongoose.mongo.ObjectId(user._id), ownerId: mongoose.mongo.ObjectId(user.ownerId) };
    return await Order.create(orderForCreate).then(order => {
        return { success: true, data: order }
    }).catch(error => {
        return { success: false, error: error}
    })
}

export const getOrder = async (orderId) => {
    return await Order.findById(orderId).then(order => {
        return { success: true, data: order }
    }).catch(error => {
        return { success: false, error: error}
    })
}