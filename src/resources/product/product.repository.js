import { respondError } from "../../helpers/response";

export const postProduct = async (productSchema, product, imagePath) => {

    const productForCreation = {...product, imagePath: imagePath }
    return await productSchema.create(productForCreation).then(data => {
        return {success: true, data: data}
    }).catch(err => {
        return {success: false, error: err};
    })
}

export const getProducts = async (productShema) => {

    return await productShema.find({}).then(products => {
        if(products) {
            return {success: true, data: products }
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