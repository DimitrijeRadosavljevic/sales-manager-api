import * as productRepository from "./product.repository"
import { Product } from "./product.model";
import { respondError, respondSuccess } from "../../helpers/response";
import * as productRepositrory from "./product.repository";

export const postProduct = async (req, res) => {
    const product = await productRepository.postProduct(Product, req.body, res).catch(err => {console.log("Error")})
    if(product != null) {
        return respondSuccess(res, product, 201);
    } else {
        return respondError(res, "Some error occured", 500);
    }
}