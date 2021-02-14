import { respondError, respondSuccess } from "../../helpers/response";
import * as orderRepository from "../order/order.repository"

export const getReportsPerProduct = async (req, res) => {

    const reportsPerProduct = await orderRepository.getReportsPerProduct(req.user._id, req.query.perPage || 6, req.query.page || 1, req.query.filter || "");
    if(reportsPerProduct.success == true) {
        return respondSuccess(res, reportsPerProduct.data, 200);
    } else {
        return respondError(res, "Error ocured: "+ reportsPerProduct.error);
    }
}

export const getReportsPerStaff = async (req, res) => {

    const reportsPerProduct = await orderRepository.getReportsPerStuff(req.user._id, req.query.perPage || 6, req.query.page || 1, req.query.filter || "");
    if(reportsPerProduct.success == true) {
        return respondSuccess(res, reportsPerProduct.data, 200);
    } else {
        return respondError(res, "Error ocured: "+ reportsPerProduct.error);
    }
}