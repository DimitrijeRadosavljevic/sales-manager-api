import * as productRepository from "./product.repository"
import { Product } from "./product.model";
import { respondError, respondSuccess } from "../../helpers/response";
import * as productRepositrory from "./product.repository";

export const postProduct = async (req, res) => {
    console.log(req.file,"Ovo je kontroler");
    console.log(req.body.product);
    const imagePath = 'http://localhost:3000/images/'+ req.file.filename;
    const product = await productRepository.postProduct(Product, JSON.parse(req.body.product), imagePath);
    if(product.success == true) {
        return respondSuccess(res, product.data, 201);
    } else {
        return respondError(res, "Error occured: " + product.error, 500);
    }
}

export const getProducts = async (req, res) => {
    const products = await productRepository.getProducts(Product);
    if(products.success == true) {
        return respondSuccess(res, products.data, 200);
    } else {
        return respondError(res, "Error ocured: "+ products.error);
    }
}

export const getProduct = async (req, res) => {
    const product = await productRepository.getProduct(Product, req.params.productId);
    if(product.success == true) {
        return respondSuccess(res, product.data, 200);
    } else {
        return respondError(res, "Error ocured: "+ product.error, product.status);
    }
}