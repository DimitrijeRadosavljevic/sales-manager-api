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

export const postOrder = async (userId, order) => {
    return await Order.create()
}