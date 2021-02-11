import * as productRepository from "./product.repository"
import { Product } from "./product.model";
import { respondError, respondSuccess } from "../../helpers/response";
import * as productRepositrory from "./product.repository";

export const postProduct = async (req, res) => {
    var imagePath = '';
    if(req.file) {
        imagePath = 'http://localhost:3000/product_images/' + req.file.filename;
    }
    console.log(req.file);
    const product = await productRepository.postProduct(Product, req.user._id, JSON.parse(req.body.product), imagePath);
    if(product.success == true) {
        return respondSuccess(res, product.data, 201);
    } else {
        return respondError(res, "Error occured: " + product.error, 500);
    }
}

export const getProducts = async (req, res) => {

    const products = await productRepository.getProducts(Product, req.user._id, req.query.perPage || 6, req.query.page || 1);
    if(products.success == true) {
        return respondSuccess(res, products.data, 200);
    } else {
        return respondError(res, "Error ocured: "+ products.error);
    }
}

export const getProduct = async (req, res) => {

    //TODO Check does user own product

    const product = await productRepository.getProduct(Product, req.params.productId);
    if(product.success == true) {
        return respondSuccess(res, product.data, 200);
    } else {
        return respondError(res, "Error ocured: "+ product.error, product.status);
    }
}

export const deleteProduct = async (req, res) => {

    //TODO Check does user own product

    const product = await productRepository.deleteProduct(req.params.productId);
    if(product.success == true) {
        return respondSuccess(res, null, 200);
    } else {
        return respondError(res, "Error occured: " + product.error, 500);
    }
}

export const updateProduct = async (req, res) => {

    //TODO Check does user own product

    let imagePath = JSON.parse(req.body.product).imagePath;
    //console.log(imagePath, "Slovca");
    if(imagePath != "" && req.file) {

        //TODO delete old image
        //console.log("Trebalo je da izbrise");
    }
    if(req.file) {
        imagePath = 'http://localhost:3000/product_images/' + req.file.filename;
        //console.log("Promenjena slika");
    }
    const product = await productRepository.updateProduct(req.params.productId, JSON.parse(req.body.product), imagePath);
    if(product.success == true) {
        return respondSuccess(res, product.data, 200);
    } else {
        return respondError(res, "Error ocured: "+ product.error, product.status);
    }
}