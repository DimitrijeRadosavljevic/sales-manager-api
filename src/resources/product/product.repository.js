import mongoose from 'mongoose';
import { Product } from "./product.model"

export const postProduct = async (productSchema, userId, product, imagePath) => {

    const productForCreation = {...product, imagePath: imagePath, ownerId: mongoose.mongo.ObjectId(userId) }
    return await productSchema.create(productForCreation).then(data => {
        return {success: true, data: data}
    }).catch(err => {
        return {success: false, error: err};
    })
}

export const getProducts = async (productShema, userId, perPage, page) => {

    let skip = (page - 1) * perPage;
    return await productShema.paginate({ownerId: mongoose.mongo.ObjectId(userId)}, {offset: skip, limit: +perPage}).then(products => {
        if(products.docs) {
            return {success: true, data: { products: products.docs, total: products.total } }
        } else {
            return {success: true, data: [] }
        }
    }).catch(err => {
        return {success: false, error: err}
    })
}

export const getProduct = async (productShema, productId) => {

    return await productShema.findById(productId).then(product => {
        
        if(product) {
            return {success: true, data: product }
        } else {
            return { success: false, error: "Product do not exist", status: 404}
        }
    }).catch(err => {
        return {success: false, error: err, status: 500}
    })
}

export const deleteProduct = async (productId) => {
    console.log(productId);
    const productForDelete = mongoose.mongo.ObjectId(productId) 
    return await Product.findByIdAndDelete(productForDelete).then(data => {
        console.log(data);
        return {success: true, data: data}
    }).catch(err => {
        return {success: false, error: err};
    })
}

export const updateProduct = async (productId, product, imagePath) => {
    const productForUpdateId = mongoose.mongo.ObjectId(productId);
    const productForUpdate = { ...product, imagePath: imagePath }; 
    return await Product.findByIdAndUpdate(productForUpdateId, productForUpdate).then(data => {
        return {success: true, data: data}
    }).catch(err => {
        return {success: false, error: err};
    })
}