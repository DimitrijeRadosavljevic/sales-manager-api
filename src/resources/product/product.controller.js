import * as productRepository from "./product.repository"
import { Product } from "./product.model";
import { respondError, respondSuccess } from "../../helpers/response";
import * as fileDelete from "../../helpers/file-delete";

export const postProduct = async (req, res) => {
    var imagePath = '';
    if(req.file) {
        imagePath = 'http://localhost:3000/product_images/' + req.file.filename;
    }
    console.log(req.file);
    const product = await productRepository.postProduct(req.user._id, JSON.parse(req.body.product), imagePath);
    if(product.success == true) {
        return respondSuccess(res, product.data, 201);
    } else {
        return respondError(res, "Error occured: " + product.error, 500);
    }
}

export const getProducts = async (req, res) => {

    const ownerId = req.user.owner ? req.user._id : req.user.ownerId

    const products = await productRepository.getProducts(ownerId, req.query.perPage || 6, req.query.page || 1, req.query.filter || "");
    if(products.success == true) {
        return respondSuccess(res, products.data, 200);
    } else {
        return respondError(res, "Error ocured: "+ products.error);
    }
}

export const getProduct = async (req, res) => {

    //TODO Check does user own product

    const product = await productRepository.getProduct(req.params.productId);
    if(product.success == true) {
        return respondSuccess(res, product.data, 200);
    } else {
        return respondError(res, "Error ocured: "+ product.error, product.status);
    }
}

export const deleteProduct = async (req, res) => {

    //TODO Check does user own product

    const deleteImageSuccess = await fileDelete.unlinkFile(req.query.imagePath);

    if(!deleteImageSuccess)
        return respondError(res, "Error occured", 500); 

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

    if(imagePath != "" && req.file) {

        const deleteImageSuccess = await fileDelete.unlinkFile(imagePath);
        if(!deleteImageSuccess)
            return respondError(res, "Error ocured", 500);

    }
    if(req.file) {

        imagePath = 'http://localhost:3000/product_images/' + req.file.filename;

    }
    const product = await productRepository.updateProduct(req.params.productId, JSON.parse(req.body.product), imagePath);
    if(product.success == true) {
        return respondSuccess(res, product.data, 200);
    } else {
        return respondError(res, "Error ocured: "+ product.error, product.status);
    }
}
