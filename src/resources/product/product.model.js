import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },

    color: {
        type: String
    },

    dimensions: {
        height: Number,
        width: Number 
    },

    staffSalePrice: Number,

    staffSaleType: String,

    quanitity: Number,

    homeDelivery: Boolean,

    imagePath: String
});

export const Product = mongoose.model('product', productSchema);