import { respondError } from "../../helpers/response";

export const postProduct = async (productSchema, product, response) => {
    return new Promise((resolve, reject) => {
        productSchema.create(product, (err, product) => {
            if(err) return reject ("Error");

            return resolve (product);
        })
    })

    // await productSchema.create(product, (err, product) => {
    //             if(err) response.send("Error");
    
    //             response.send(product);
    //         })
}