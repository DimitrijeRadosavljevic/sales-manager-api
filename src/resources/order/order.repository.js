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
    const orderForCreate = {
        ...order,
        seller: {
            _id: mongoose.mongo.ObjectId(user._id),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        },
        ownerId: mongoose.mongo.ObjectId(user.ownerId)
    };
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

export const getReportsPerProduct = async (ownerId, perPage, page, filter) => {

    let skip = (page - 1) * perPage

    return await Order.aggregate([
        {
            $match: {
                ownerId: mongoose.mongo.ObjectId(ownerId),
            }
        },
        {
            $unwind: '$chartItems'
        },
        {
            $project: {
                _id: false,
                chartItems: true
            }
        },
        {
            $group: {
                _id: {
                    productId: '$chartItems._id',
                    productName: '$chartItems.name'
                },
                quantity: {
                    $sum: {
                        $sum: '$chartItems.quantity'
                    }
                },
            }
        },
        {
            $project: {
                productDetails: '$_id',
                quantity: true,
                _id: false
            }
        },
        {
            $match: { 'productDetails.productName': { '$regex': filter, '$options': 'i' } },
        },
        {
            $facet: {
                reportsPerProduct: [
                    { $skip: skip },
                    { $limit: +perPage }
                ],
                total: [
                    {
                        $count: 'count'
                    }
                ]
            }
        }
    ]).then(products => {
        return {success: true, data: { products: products[0].reportsPerProduct, total: products[0].total } }
    }).catch(err => {
        return {success: false, error: err}
    })
}

export const getReportsPerStuff = async (ownerId, perPage, page, filter) => {

    let skip = (page - 1) * perPage

    return await Order.aggregate([
        {
            $match: {
                ownerId: mongoose.mongo.ObjectId(ownerId),
                // $or: [
                //     { 'seller.firstName': { '$regex': filter, '$options': 'i' } },
                //     { 'seller.lastName': { '$regex': filter, '$options': 'i' } },
                //     { 'seller.email': { '$regex': filter, '$options': 'i' } }
                // ]
            }
        },
        {
            $group: {
                _id: '$seller._id',
                seller: {
                    $first: '$seller'
                },
                amount: {
                    $sum: '$amount'
                },
                numberOfItems: {
                    $sum: {
                        $sum: '$chartItems.quantity'
                    }
                }
            }
        },
        {
            $facet: {
                reportsPerStaff: [
                    { $skip: skip },
                    { $limit: +perPage }
                ],
                total: [
                    {
                        $count: 'count'
                    }
                ]
            }
        }
    ])
      .then(products => {
          return {success: true, data: { products: products } }
          // return {success: true, data: { products: products[0].reportsPerStaff, total: products[0].total } }
      }).catch(err => {
          return {success: false, error: err}
      })
}

export const getSellerOrders = async (userId, perPage, page) => {

    let skip = (page - 1) * perPage;
    return await Order.paginate({createdBy: mongoose.mongo.ObjectId(userId)}, {offset: skip, limit: +perPage}).then(orders => {
        if(orders.docs) {
            return {success: true, data: { orders: orders.docs, total: orders.total } }
        } else {
            return {success: true, data: [] }
        }
    }).catch(err => {
        return {success: false, error: err}
    })
}
