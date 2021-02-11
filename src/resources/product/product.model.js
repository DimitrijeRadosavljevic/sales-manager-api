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
        x: Number,
        y: Number,
        z: Number 
    },

    staffSalePrice: {
        type: Number,
        required: true
    },

    staffSaleType: String,

    quantity: Number,

    homeDelivery: Boolean,

    imagePath: String
});

export const Product = mongoose.model('product', productSchema);